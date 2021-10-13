import React from 'react';
import { FormControl, Input } from 'native-base';

const Password = ({ callback }) => {
  const label = callback.getPrompt();
  const setPassword = (text) => callback.setPassword(text);
  const required = (callback.isRequired && callback.isRequired()) || false;
  return (
    <FormControl required={required}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input type="password" onChangeText={setPassword} />
    </FormControl>
  );
};

export { Password };
