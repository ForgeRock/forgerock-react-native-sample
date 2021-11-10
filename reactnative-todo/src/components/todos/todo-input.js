/*
 * forgerock-react-native-sample
 *
 * todo-input.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Button, Input, HStack } from 'native-base';
import * as React from 'react';

import request from '../../utilities/request';

export default function TodoInput({ dispatch }) {
  const [text, onChangeText] = React.useState('');

  const addTodo = async (e) => {
    e.preventDefault();
    const todo = { title: text };
    try {
      const data = await request('POST', '', todo);
      dispatch({
        type: 'add-todo',
        payload: data,
      });
    } catch (err) {
      console.error(err);
    }
    onChangeText('');
  };

  return (
    <HStack flexDirection="row" justifyContent="space-between">
      <Input
        flexGrow="1"
        onChangeText={onChangeText}
        placeholder="What needs doing?"
        size="lg"
        value={text}
      />
      <Button ml={3} onPress={addTodo} size="lg">
        Create
      </Button>
    </HStack>
  );
}
