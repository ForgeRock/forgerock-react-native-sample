import React, { useState } from 'react';
import { FormControl, Input, Select } from 'native-base';

function KBA({ callback }) {
  const [selectedQuestion, setAns] = useState('');
  const updateQuestion = (question) => {
    setAns(question);
    callback.setQuestion(question);
  };
  const label = callback.getPrompt();
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>

      <Select
        accessibilityLabel="Select Security Question"
        placeholder="Select Security Question"
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
