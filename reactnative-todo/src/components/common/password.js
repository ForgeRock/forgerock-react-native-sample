import React from 'react';
import { FormControl, Input } from 'native-base';

const Password = ({ callback }) => {
  const label = callback.getPrompt();
  const setPassword = (text) => callback.setPassword(text);
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Input type="password" onChangeText={setPassword} />
    </FormControl>
  );
};

export { Password };
