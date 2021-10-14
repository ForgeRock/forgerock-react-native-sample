import React from 'react';
import { handleFailedPolicies } from '../utilities/failed-policies';
import { FormControl, Input } from 'native-base';

const Username = ({ callback }) => {
  const error = handleFailedPolicies(
    callback.getFailedPolicies ? callback.getFailedPolicies() : [],
  );

  const label = callback.getPrompt();
  const setUsername = (text) => callback.setName(text);
  return (
    <FormControl isInvalid={error}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        onChangeText={setUsername}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};

export { Username };
