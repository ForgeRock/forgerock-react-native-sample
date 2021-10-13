import React, { useEffect, useState } from 'react';
import { LoginContainer } from '../components/login';
import { NativeModules } from 'react-native';
import { FRStep } from '@forgerock/javascript-sdk';
const { FRAuthBridge } = NativeModules;

function Login() {
  const [loading, setLoading] = useState(true);
  const [callbacks, setCallbacks] = useState([]);
  const [step, setStep] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await FRAuthBridge.login();
        const next = JSON.parse(data);
        const step = new FRStep(next);
        setLoading(false);
        setStep(step);
        setCallbacks(step.callbacks);
      } catch (err) {
        await FRAuthBridge.logout();
        setError(err.message);
      }
    })();
  }, []);

  return (
    <LoginContainer
      step={step}
      callbacks={callbacks}
      error={error}
      setLoading={setLoading}
      loading={loading}
    />
  );
}

export { Login };
