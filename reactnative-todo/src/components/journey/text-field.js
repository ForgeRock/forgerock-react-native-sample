/*
 * forgerock-reactnative-sample
 *
 * index.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React from 'react';
import { FormControl, Input } from 'native-base';
import { handleFailedPolicies } from '../utilities/failed-policies';

const TextField = ({ callback }) => {
  const error = handleFailedPolicies(callback.getFailedPolicies());
  const isRequired = callback.isRequired ? callback.isRequired() : false;
  const label = callback.getPrompt();
  return (
    <FormControl isRequired={isRequired} isInvalid={error}>
      <FormControl.Label>{label}</FormControl.Label>
      <FormControl.ErrorMessage>
        {error.length ? error : ''}
      </FormControl.ErrorMessage>
      <Input type="text" onChangeText={(v) => callback.setValue(v)} />
    </FormControl>
  );
};

export { TextField };
