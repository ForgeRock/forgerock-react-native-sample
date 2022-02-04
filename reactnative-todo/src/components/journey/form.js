/*
 * forgerock-react-native-sample
 *
 * form.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRStep } from '@forgerock/javascript-sdk';
import { Box, Button, FormControl, ScrollView } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { NativeModules } from 'react-native';

import { AppContext } from '../../global-state';
import Loading from '../utilities/loading';
import Alert from '../utilities/alert';
import Password from './password';
import Text from './text';
import Unknown from './unknown';

const { FRAuthSampleBridge } = NativeModules;

export default function Form() {
  const [_, methods] = useContext(AppContext);
  const [step, setStep] = useState(null);
  const [isAuthenticated, setAuthentication] = useState(false);
  console.log(step);

  useEffect(() => {
    async function getStep() {
      try {
        await FRAuthSampleBridge.logout();
        const dataString = await FRAuthSampleBridge.login();
        const data = JSON.parse(dataString);
        const initialStep = new FRStep(data);
        setStep(initialStep);
      } catch (err) {
        setStep({
          type: 'LoginFailure',
          message: 'Application state has an error.',
        });
      }
    }
    getStep();
  }, []);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await FRAuthSampleBridge.getUserInfo();
      console.log(userInfo);

      methods.setName(userInfo.name);
      methods.setEmail(userInfo.email);
      methods.setAuthentication(true);
    }

    if (isAuthenticated) {
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  function mapCallbacksToComponents(cb, idx) {
    const name = cb?.payload?.input?.[0].name;
    switch (cb.getType()) {
      case 'NameCallback':
        return <Text callback={cb} inputName={name} key="username" />;
      case 'PasswordCallback':
        return <Password callback={cb} inputName={name} key="password" />;
      default:
        // If current callback is not supported, render a warning message
        return <Unknown callback={cb} key={`unknown-${idx}`} />;
    }
  }
  if (!step) {
    return <Loading message="Checking your session ..." />;
  } else if (step.type === 'Step') {
    return (
      <ScrollView>
        <Box safeArea flex={1} p={2} w="90%" mx="auto">
          <FormControl>
            {step.callbacks?.map(mapCallbacksToComponents)}
            <Button
              onPress={() => {
                async function getNextStep() {
                  try {
                    const response = await FRAuthSampleBridge.next(
                      JSON.stringify(step.payload),
                    );
                    if (response.type === 'LoginSuccess') {
                      const accessInfo = JSON.parse(response.accessInfo);
                      setStep({
                        accessInfo,
                        message: 'Successfully logged in.',
                        type: 'LoginSuccess',
                      });
                      setAuthentication(true);
                    } else {
                      setStep({
                        message: 'There has been a login failure.',
                        type: 'LoginFailure',
                      });
                    }
                  } catch (err) {
                    console.log(`Error: form submission; ${err}`);
                    setStep({
                      message: 'There has been a login failure.',
                      type: 'LoginFailure',
                    });
                  }
                }
                getNextStep();
              }}
            >
              Sign In
            </Button>
          </FormControl>
        </Box>
      </ScrollView>
    );
  } else {
    return (
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Alert message={step.message} type={step.type} />
      </Box>
    );
  }
}
