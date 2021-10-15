/*
 * forgerock-reactnative-sample
 *
 * username.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React from 'react';
import { handleFailedPolicies } from '../utilities/failed-policies';
import { FormControl, Input } from 'native-base';

const Username = ({ callback }) => {
  const error = handleFailedPolicies(
    callback.getFailedPolicies ? callback.getFailedPolicies() : [],
  );

  const label = callback.getPrompt();
  const setUsername = (text) => callback.setName(text);
  const isRequired = callback.isRequired ? callback.isRequired() : false;

  return (
    <FormControl isRequired={isRequired} isInvalid={error}>
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
