/*
 * forgerock-react-native-sample
 *
 * journey-hook.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { FRStep } from '@forgerock/javascript-sdk';
import { useContext, useEffect, useState } from 'react';
import { NativeModules } from 'react-native';

import { AppContext } from './global-state';

const { FRAuthSampleBridge } = NativeModules;

/**
 *  @function useJourneyHandler
 *  @param {Object} { action: { type : 'login' | 'register' } }
 *  @returns {Object} - {
 *    formFailureMessage: string,
 *    renderStep: Object<any>,
 *    submittingForm: Boolean,
 *    setSubmissionStep: React Hook Setter,
 *    setSubmittingForm: React Hook Setter,
 * };
 */
export default function useJourneyHandler({ action }) {
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
  const [isProcessingForm, setProcessingForm] = useState(false);
  // User state
  const [_, setAuthentication] = useContext(AppContext);

  /**
   * Since we have API calls to AM, we need to handle these requests as side-effects.
   * This will allow the view to render, but update/re-render after the request completes.
   */
  useEffect(() => {
    /**
     * @function getStep - The function for calling AM with a previous step to get a new step
     * @param {Object} prev - This is the previous step that should contain the input for AM
     * @returns {undefined}
     */
    async function getStep(prev) {
      // if we have no render step we are initiliazing a login or a register flow
      if (!renderStep) {
        if (action.type === 'login') {
          try {
            /*****************************************************************
             * NATIVE BRIDGE SDK INTEGRATION POINT
             * Summary: Call the login endpoint
             * --------------------------------------------------------------
             * Details: When we have no current 'renderStep', that means we have no data to render.
             * Given our action type, we know we want to login so we can call the login method
             * in order to get back our data to render for our login screen.
             *************************************************************** */
            const data = await FRAuthSampleBridge.login();
            const next = JSON.parse(data);
            /*****************************************************************
             * JAVASCRIPT SDK INTEGRATION POINT
             * Summary: Convert Response to an FRStep
             * --------------------------------------------------------------
             * This is a helper method provided by the Javascript SDK.
             * It will decorate the callbacks array items (each object), with
             * helper methods on the prototype for each object.
             * In return, much of the state management
             * is taken care of by the SDK layer.
             *************************************************************** */
            const step = new FRStep(next);

            setRenderStep(step);
            setProcessingForm(false);
          } catch (err) {
            /** *********************************************************************
             * NATIVE BRIDGE SDK INTEGRATION POINT
             * Summary: Get OAuth/OIDC tokens with Authorization Code Flow w/PKCE.
             * ----------------------------------------------------------------------
             * Details: Since we have successfully authenticated the user, we can now
             * get the OAuth2/OIDC tokens.
             * ******************************************************************** */

            const token = await FRAuthSampleBridge.getAccessToken();
            if (token) {
              /**
               * Setting authentication to true results in a re-rendering of
               * the navigation bar and of the correct screen.
               */
              setAuthentication(true);
            }
          }
        } else {
          /*****************************************************************
           * NATIVE BRIDGE SDK INTEGRATION POINT
           * Summary: Call the register endpoint
           * --------------------------------------------------------------
           * Details: When we have no current 'renderStep', that means we have no data to render.
           * Given our action type, we know we want to register a user, so we can call the login method
           * in order to get back our data to render for our register screen.
           *************************************************************** */
          const data = await FRAuthSampleBridge.register();
          const next = JSON.parse(data);

          /*****************************************************************
           * JAVASCRIPT SDK INTEGRATION POINT
           * Summary: Convert Response to an FRStep
           * --------------------------------------------------------------
           * This is a helper method provided by the Javascript SDK.
           * It will decorate the callbacks array items (each object), with
           * helper methods on the prototype for each object.
           * In return, much of the state management
           * is taken care of by the SDK layer.
           *************************************************************** */
          const step = new FRStep(next);

          setRenderStep(step);
          setProcessingForm(false);
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
         * NATIVE BRIDGE SDK INTEGRATION POINT
         * Summary: Call the SDK's next method to submit the current step.
         * ----------------------------------------------------------------------
         * Details: This calls the next method with the previous step, expecting
         * the next step to be returned, or a success or failure.
         ********************************************************************* */
        try {
          const nextStep = await FRAuthSampleBridge.next(
            JSON.stringify(renderStep.payload),
          );
          /**
           * Condition for handling start, error handling and completion
           * of login journey.
           */
          if (nextStep.type === 'LoginSuccess') {
            // User is authenticated, now call for OAuth tokens

            /** *********************************************************************
             * Native Bridge SDK INTEGRATION POINT
             * ----------------------------------------------------------------------
             * Details: This call is just to "prove" that we have successfully
             * completed the oauth flow and gives us the ability to present user
             * information to the screen. It is completely optional.
             * ********************************************************************* */
            await FRAuthSampleBridge.getUserInfo();

            /**
             * Setting authentication to true results in a re-rendering of
             * the navigation bar and of the correct screen.
             */
            setAuthentication(true);
          } else {
            /**
             * If we got here, then the form submission was both successful
             * and requires additional step rendering.
             */
            setRenderStep(nextStep);
            setProcessingForm(false);
          }
        } catch (err) {
          /**
           * Handle basic form error
           */
          setFormFailureMessage(err.message);

          // setRenderStep(newStep);
          setProcessingForm(false);
          /**
           * Handle basic form error
           */
          setFormFailureMessage(err.message);

          /** *******************************************************************
           * NATIVE BRIDGE SDK INTEGRATION POINT
           * Summary: Call next with submission step payload
           * --------------------------------------------------------------------
           * Details: Because LoginFailure throws, we have to handle the failure
           * in the catch block
           * ******************************************************************* */
          try {
            const json = await FRAuthSampleBridge.next(
              JSON.stringify(submissionStep.payload),
            );
            const data = JSON.parse(json);
            /*****************************************************************
             * JAVASCRIPT SDK INTEGRATION POINT
             * Summary: Convert Response to an FRStep
             * --------------------------------------------------------------
             * This is a helper method provided by the Javascript SDK.
             * It will decorate the callbacks array items (each object), with
             * helper methods on the prototype for each object.
             * In return, much of the state management
             * is taken care of by the SDK layer.
             *************************************************************** */
            const newStep = new FRStep({
              ...data,
              sessionToken: JSON.parse(data.sessionToken),
            });

            if (newStep.getStage && newStep.getStage() === previousStage) {
              newStep.callbacks = previousCallbacks;
              newStep.payload = {
                ...previousPayload,
                authId: newStep.payload.authId,
              };
            }

            setRenderStep(newStep);
            setProcessingForm(false);
          } catch (err2) {
            console.error('Parsing received data for JS SDK failed.');
          }
        }
      }
    }

    /* *******************************************************************
     * Kickstart the authentication journey!
     * submissionStep will initially be `null`, and that's intended.
     ****************************************************************** */
    getStep(submissionStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action.type, submissionStep]);

  return {
    formFailureMessage,
    renderStep,
    isProcessingForm,
    setSubmissionStep,
    setProcessingForm,
  };
}
