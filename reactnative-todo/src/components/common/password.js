import React from 'react';
import { FormControl, Input } from 'native-base';
import { handleFailedPolicies } from '../utilities/failed-policies';

const Password = ({ callback }) => {
  const label = callback.getPrompt();
  const setPassword = (text) => callback.setPassword(text);
  const required = (callback.isRequired && callback.isRequired()) || false;
  const error = handleFailedPolicies(callback?.getFailedPolicies());
  console.log(error);
  return (
    <FormControl isInvalid={error}>
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
      <FormControl.Label>{label}</FormControl.Label>
      <Input type="password" onChangeText={setPassword} />
    </FormControl>
  );
};

export { Password };
