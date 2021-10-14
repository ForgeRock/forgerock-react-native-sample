import React, { useContext, useState } from 'react';
import { Box, VStack, FormControl, ScrollView } from 'native-base';
import { NativeModules } from 'react-native';

import { AppContext } from '../../global-state.js';
import { Loading } from '../utilities/loading';
import { Footer } from './footer';
import { Header } from './header';
import { mapCallbacksToComponents } from '../common/mapComponentsToCallback';

const { FRAuthBridge } = NativeModules;

function LoginContainer({ step, callbacks, error, setLoading, loading }) {
  const [err, setErr] = useState(error);
  const [, { setAuthentication }] = useContext(AppContext);

  const handleFailure = () => {
    setErr('Invalid username or password');
  };

  const handleSubmit = async () => {
    /*
     * We need to mutate the callbacks map in order to send the updated values through the next step
     * in the journey
     */
    setLoading(true);

    try {
      /*
       * Call the next step in the authentication journey, passing in the data to submit.
       * We want to pass in the mutated callbacks array, which contains the values the user has
       * added to the form
       */
      const req = JSON.stringify(step.payload);
      const response = await FRAuthBridge.next(req);

      /*
       * If we have the LoginSuccess case, the IOS SDK has already gone through the token flow
       */
      if (response.type === 'LoginSuccess') {
        setAuthentication(true);
        setLoading(false);
      } else {
        handleFailure('Error submitting form');
        setAuthentication(false);
        setLoading(false);
      }
    } catch (error) {
      if (error && error.message) {
        handleFailure(error);
      } else {
        handleFailure('Error submitting form');
      }
      setAuthentication(false);
      setLoading(false);
    }
  };

  return loading ? (
    <Loading message={'Checking your session'} />
  ) : (
    <ScrollView>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Header />
        <FormControl isInvalid={Boolean(err)}>
          {err ? (
            <FormControl.ErrorMessage>{err}</FormControl.ErrorMessage>
          ) : null}
          <VStack space={2} mt={5}>
            {callbacks.length
              ? callbacks.map((callback) => mapCallbacksToComponents(callback))
              : null}
            <Footer handleSubmit={handleSubmit} />
          </VStack>
        </FormControl>
      </Box>
    </ScrollView>
  );
}

export { LoginContainer };
