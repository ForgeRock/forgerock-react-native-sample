import React, { useContext } from 'react';
import { NativeModules } from 'react-native';
import { Button, Box, FormControl, ScrollView } from 'native-base';

import { Header } from './header';
import { Loading } from '../utilities/loading';
import { callbackTypeToComponent } from '../utilities/callback-map';
import { AppContext } from '../../global-state';
import { FRStep } from '@forgerock/javascript-sdk';

const { FRAuthBridge } = NativeModules;

function RegisterContainer({ setStep, data, navigation, setLoading, loading }) {
  const [, { setAuthentication }] = useContext(AppContext);

  const handleRegistrationSubmit = async () => {
    setLoading(true);
    try {
      const response = await FRAuthBridge.next(JSON.stringify(data.payload));
      if (response.type === 'LoginSuccess') {
        setAuthentication(true);
        setStep(response);
        navigation.navigate('Home');
      } else {
        const data = JSON.parse(response);
        const step = new FRStep(data);
        setStep(step);
        setAuthentication(false);
        setLoading(false);
      }
    } catch (err) {
      console.log('err', err, err.message);
    }
  };
  console.log(data);
  return loading ? (
    <Loading message={'Checking your session'} />
  ) : (
    <ScrollView>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Header />
        <FormControl>
          {data?.callbacks.map((callback) => {
            return callback.getType() === 'TermsAndConditionsCallback'
              ? callbackTypeToComponent[callback.getType()]({
                  callback,
                })
              : callback?.getPredefinedQuestions ?? null
              ? callbackTypeToComponent[callback.getType()]({ callback })
              : callbackTypeToComponent[callback.getType()]({ callback });
          }) ?? null}
          <Button onPress={handleRegistrationSubmit}>Register</Button>
        </FormControl>
      </Box>
    </ScrollView>
  );
}

export { RegisterContainer };
