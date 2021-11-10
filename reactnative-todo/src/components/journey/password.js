/*
 * forgerock-react-native-sample
 *
 * password.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { Button, FormControl, Input } from 'native-base';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function handlePasswordFailures(arr = []) {
  return arr.reduce((prev, curr) => {
    let failureObj;
    try {
      failureObj = JSON.parse(curr);
    } catch (err) {
      console.log('Parsing failure for password');
    }

    switch (failureObj.policyRequirement) {
      case 'LENGTH_BASED':
        prev = `${prev}${prev ? '\n' : ''}Ensure password contains more than ${
          failureObj.params['min-password-length']
        } characters. `;
        break;
      case 'CHARACTER_SET':
        prev = `${prev}${
          prev ? '\n' : ''
        }Ensure password contains 1 of each: capital letter, number and special character. `;
        break;
      default:
        prev = `${prev}Please check this value for correctness.`;
    }
    return prev;
  }, '');
}
export default function Password({ callback }) {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);
  /********************************************************************
   * JAVASCRIPT SDK INTEGRATION POINT
   * Summary: Utilize Callback methods
   * ------------------------------------------------------------------
   *  Details: Because we wrap our responses in FRStep using the Javascript SDK
   *  we have access to helper methods to set, and retrieve information from our response.
   *  Referencing these helper methods allows us to avoid managing the state
   *  in our own application and leverage the SDK to do so
   *
   *  Note: Password is a little unique so we have to have some handling
   *  for Password that we don't have for other callbacks
   *  *************************************************************** */
  const label = callback.getPrompt();
  const setPassword = (text) => callback.setPassword(text);
  const error = handlePasswordFailures(callback?.getFailedPolicies());
  const isRequired = callback.isRequired ? callback.isRequired() : false;
  return (
    <FormControl isRequired={isRequired} isInvalid={error}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        type={show ? 'text' : 'password'}
        size="lg"
        onChangeText={setPassword}
        InputRightElement={
          <Button
            size="xs"
            rounded="none"
            w="1/6"
            h="full"
            backgroundColor="muted.200"
            onPress={handleClick}
          >
            {show ? (
              <Icon name="eye-off" size={18} />
            ) : (
              <Icon name="eye" size={18} />
            )}
          </Button>
        }
      />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
}
