import React from 'react';
// import { handleFailedPolicies } from '../utilities/failedPolicies';
import { FormControl, Input } from 'native-base';

const Username = ({ callback }) => {
  const error = '';
  const label = callback.getPrompt();
  const setUsername = (text) => callback.setName(text);
  return (
    <FormControl isInvalid={error}>
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
