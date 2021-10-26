/*
 * forgerock-reactnative-sample
 *
 * text-field.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React from 'react';
import { FormControl, Input } from 'native-base';
import { handleFailedPolicies } from '../utilities/failed-policies';

const TextField = ({ callback }) => {
  /******************************************************************** 
   * JAVASCRIPT SDK INTEGRATION POINT
   * Summary: Utilize Callback methods
   * ------------------------------------------------------------------
   *  Details: Because we wrap our responses in FRStep using the Javascript SDK
   *  we have access to helper methods to set, and retrieve information from our response.
   *  Referencing these helper methods allows us to avoid managing the state
   *  in our own application and leverage the SDK to do so
   *  *************************************************************** */
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
