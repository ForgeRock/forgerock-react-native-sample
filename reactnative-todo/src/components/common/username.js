import React from 'react';
import { handleFailedPolicies } from '../utilities/failed-policies';
import { FormControl, Input } from 'native-base';

const Username = ({ callback }) => {
  const error = handleFailedPolicies(
    callback.getFailedPolicies ? callback.getFailedPolicies() : [],
  );
  const required = (callback.isRequired && callback.isRequired()) || false;
  const label = callback.getPrompt();
  const setUsername = (text) => callback.setName(text);
  return (
    <FormControl required={required} isInvalid={error}>
      <FormControl.Label>{label}</FormControl.Label>
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
      <Input
        onChangeText={setUsername}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
    </FormControl>
  );
};

export { Username };
