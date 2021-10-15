/*
 * forgerock-reactnative-sample
 *
 * password.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React from 'react';
import { FormControl, Input } from 'native-base';

function handlePasswordFailures(arr = []) {
  return arr.reduce((prev, curr) => {
    let failureObj;
    try {
      failureObj = JSON.parse(curr);
    } catch (err) {
      console.log(`Parsing failure for ${passwordLabel}`);
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
const Password = ({ callback }) => {
  const label = callback.getPrompt();
  const setPassword = (text) => callback.setPassword(text);
  const error = handlePasswordFailures(callback?.getFailedPolicies());
  const isRequired = callback.isRequired ? callback.isRequired() : false;
  return (
    <FormControl isRequired={isRequired} isInvalid={error}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input type="password" onChangeText={setPassword} />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};

export { Password };
