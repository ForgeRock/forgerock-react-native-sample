/*
 * forgerock-react-native-sample
 *
 * kba.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React, { useState } from 'react';
import { FormControl, Input, Select } from 'native-base';

function KBA({ callback }) {
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
        placeholder={label}
        selectedValue={selectedQuestion}
        onValueChange={updateQuestion}
      >
        {callback.getPredefinedQuestions().map((question) => (
          <Select.Item label={question} key={question} value={question} />
        ))}
      </Select>
      <Input onChangeText={(itemValue) => callback.setAnswer(itemValue)} />
    </FormControl>
  );
}

export { KBA };
