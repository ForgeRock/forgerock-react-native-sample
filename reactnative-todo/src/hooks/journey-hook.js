/*
 * forgerock-sample-web-react
 *
 * state.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { useContext, useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import { FRStep } from '@forgerock/javascript-sdk';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../global-state';

const { FRAuthBridge } = NativeModules;
/**
 *
 * @param {Object} props - React props object
 * @param {Object} props.action - Action object for a "reducer" pattern
 * @param {string} props.action.type - Action type string that represents the action
 * @param {Object} props.form - The form metadata object
 * @returns {Object} - React component object
 */
function useJourneyHandler({ action }) {
  /**
   * Compose the state used in this view.
   * First, we will use the global state methods found in the App Context.
   * Then, we will create local state to manage the login journey. The
   * underscore is an unused variable, since we don't need the current global state.
   *
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  // Form level errors
  const [formFailureMessage, setFormFailureMessage] = useState(null);
  // Step to render
  const [renderStep, setRenderStep] = useState(null);
  // Step to submit
  const [submissionStep, setSubmissionStep] = useState(null);
  // Processing submission
  const [submittingForm, setSubmittingForm] = useState(false);
  // User state
  const [user, setUser] = useState(null);
  const [, { setAuthentication }] = useContext(AppContext);
  const navigation = useNavigation();

  /**
   * Since we have API calls to AM, we need to handle these requests as side-effects.
   * This will allow the view to render, but update/re-render after the request completes.
   */
  useEffect(() => {
    /**
     * @function getOAuth - The function to call when we get a LoginSuccess
     * @returns {undefined}
     */
    async function getOAuth() {
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Get OAuth/OIDC tokens with Authorization Code Flow w/PKCE.
       * ----------------------------------------------------------------------
       * Details: Since we have successfully authenticated the user, we can now
       * get the OAuth2/OIDC tokens.
       * ************************************************************************* */
      await FRAuthBridge.getAccessToken();

      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Call the user info endpoint for some basic user data.
       * ----------------------------------------------------------------------
       * Details: This is an OAuth2 call that returns user information with a
       * valid access token. This is optional and only used for displaying
       * user info in the UI.
       ********************************************************************* */
      const user = await FRAuthBridge.getUserInfo();
      setUser(user);
    }

    /**
     * @function getStep - The function for calling AM with a previous step to get a new step
     * @param {Object} prev - This is the previous step that should contain the input for AM
     * @returns {undefined}
     */
    async function getStep(prev) {
      if (!renderStep) {
        if (action.type === 'login') {
          try {
            const data = await FRAuthBridge.login();
            const next = JSON.parse(data);
            const step = new FRStep(next);

            setRenderStep(step);
            setSubmittingForm(false);
          } catch (err) {
            console.log('err?', err);
          }
        } else {
          const data = await FRAuthBridge.register();
          const next = JSON.parse(data);
          const step = new FRStep(next);

          setRenderStep(step);
          setSubmittingForm(false);
        }
      } else {
        /**
         * Save previous step information just in case we have a total
         * form failure due to 400 response from ForgeRock.
         */
        const previousStage = prev?.getStage && prev.getStage();
        const previousCallbacks = prev?.callbacks;
        const previousPayload = prev?.payload;

        /** *********************************************************************
         * SDK INTEGRATION POINT
         * Summary: Call the SDK's next method to submit the current step.
         * ----------------------------------------------------------------------
         * Details: This calls the next method with the previous step, expecting
         * the next step to be returned, or a success or failure.
         ********************************************************************* */
        try {
          const json = await FRAuthBridge.next(
            JSON.stringify(renderStep.payload),
          );

          const data = JSON.parse(json);
          const nextStep = new FRStep(data);

          /**
           * Condition for handling start, error handling and completion
           * of login journey.
           */
          if (nextStep.type === 'LoginSuccess') {
            // User is authenticated, now call for OAuth tokens
            getOAuth();
            setAuthentication(true);
            navigation.navigate('Home');
          } else {
            /**
             * If we got here, then the form submission was both successful
             * and requires additional step rendering.
             */
            setRenderStep(nextStep);
            setSubmittingForm(false);
          }
        } catch (err) {
          /**
           * Handle basic form error
           */
          setFormFailureMessage(err.message);

          // setRenderStep(newStep);
          setSubmittingForm(false);
          /**
           * Handle basic form error
           */
          setFormFailureMessage(err.message);

          /** *******************************************************************
           * SDK INTEGRATION POINT
           * Summary: Call next without previous step to get new authId.
           * --------------------------------------------------------------------
           * Details: Since this is within the failure block, let's call the next
           * function again but with no step (null) to get a fresh authId.
           ******************************************************************* */
          const newStep = await FRAuthBridge.next(
            JSON.stringify(submissionStep.payload),
          );

          /** *******************************************************************
           * SDK INTEGRATION POINT
           * Summary: Repopulate callbacks/payload with previous data.
           * --------------------------------------------------------------------
           * Details: Now that we have a new authId (the identification of the
           * fresh step) let's populate this new step with old callback data if
           * the stage is the same. If not, the user will have to refill form. We
           * will display the error we collected from the previous submission,
           * restart the flow, and provide better UX with the previous form data,
           * so the user doesn't have to refill the form.
           ******************************************************************* */
          if (newStep.getStage() === previousStage) {
            newStep.callbacks = previousCallbacks;
            newStep.payload = {
              ...previousPayload,
              authId: newStep.payload.authId,
            };
          }

          setRenderStep(newStep);
          setSubmittingForm(false);
        }
      }
    }

    /**
     * Kickstart the authentication journey!
     * submissionStep will initially be `null`, and that's intended.
     */
    getStep(submissionStep);
  }, [action.type, submissionStep]);

  return {
    formFailureMessage,
    renderStep,
    submittingForm,
    user,
    setSubmissionStep,
    setSubmittingForm,
  };
}

export { useJourneyHandler };
