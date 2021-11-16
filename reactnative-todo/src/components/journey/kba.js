/*
 * forgerock-react-native-sample
 *
 * kba.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { FormControl, Input, Select } from 'native-base';
import React, { useState } from 'react';

export default function KBA({ callback }) {
  /********************************************************************
   * JAVASCRIPT SDK INTEGRATION POINT
   * Summary: Utilize Callback methods
   * ------------------------------------------------------------------
   *  Details: Because we wrap our responses in FRStep using the Javascript SDK
   *  we have access to helper methods to set, and retrieve information from our response.
   *  Referencing these helper methods allows us to avoid managing the state
   *  in our own application and leverage the SDK to do so
   *  *************************************************************** */

  const [selectedQuestion, setAns] = useState('');
  const updateQuestion = (question) => {
    setAns(question);
    callback.setQuestion(question);
  };
  const label = callback.getPrompt();
  const isRequired = callback.isRequired ? callback.isRequired() : false;

  return (
    <FormControl isRequired={isRequired}>
      <FormControl.Label>{label}</FormControl.Label>
      <Select
        accessibilityLabel={label}
        onValueChange={updateQuestion}
        placeholder={label}
        selectedValue={selectedQuestion}
      >
        {callback.getPredefinedQuestions().map((question) => (
          <Select.Item label={question} key={question} value={question} />
        ))}
      </Select>
      <Input
        onChangeText={(itemValue) => callback.setAnswer(itemValue)}
        size="lg"
      />
    </FormControl>
  );
}
