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
    console.log(failureObj);
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
  const required = (callback.isRequired && callback.isRequired()) || false;
  const error = handlePasswordFailures(callback?.getFailedPolicies());
  return (
    <FormControl isRequired={required} isInvalid={error}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input type="password" onChangeText={setPassword} />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};

export { Password };
