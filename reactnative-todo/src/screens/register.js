import React, { useEffect, useState } from 'react';
import { RegisterContainer } from '../components/register';
import { Loading } from '../components/utilities/loading';
import { FRStep } from '@forgerock/javascript-sdk';
import { NativeModules } from 'react-native';

const { FRAuthBridge } = NativeModules;

function Register({ navigation }) {
  const [data, setStep] = useState(null);
  const [loading, setLoading] = useState(true);
  function setResponse(response) {
    console.log(response);
    if (response.sessionToken) {
      const newData = {
        ...response,
        sessionToken: JSON.parse(response.sessionToken),
      };
      setData(newData);
      return newData;
    }
    if (response.callbacks) {
      const newData = {
        ...response,
        callbacks: response.callbacks.map((res) => ({
          ...res,
          response: JSON.parse(res.response),
        })),
      };
      setData(newData);
      return newData;
    }
  }
  useEffect(() => {
    async function start() {
      try {
        await FRAuthBridge.logout();
        const response = await FRAuthBridge.register();
        const data = JSON.parse(response);
        const step = new FRStep(data);

        setStep(step);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    start();
  }, []);

  return loading ? (
    <Loading message={'Checking your session'} />
  ) : (
    <RegisterContainer
      navigation={navigation}
      data={data}
      setStep={setResponse}
      setLoading={setLoading}
      navigation={navigation}
    />
  );
}

export { Register };
