import * as React from 'react';
import { Button, Input, HStack } from 'native-base';
import { request } from '../utilities/request';

function TodoInput({ dispatch }) {
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
        value={text}
        placeholder="What needs doing"
      />
      <Button ml={3} onPress={addTodo}>
        Create
      </Button>
    </HStack>
  );
}

export { TodoInput };
