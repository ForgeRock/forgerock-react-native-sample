/*
 * forgerock-react-native-sample
 *
 * todos.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React, { useReducer } from 'react';
import { VStack, Box, Heading, ScrollView, Text } from 'native-base';

import Loading from '../components/utilities/loading';
import reducer from '../components/todos/reducer';
import request from '../utilities/request';
import Todo from '../components/todos/todo';
import TodoInput from '../components/todos/todo-input';
import useToggle from '../hooks/use-toggle';
import useTodos from '../hooks/use-todos';

export default function Todos() {
  const [fetching, setFetch] = useToggle(false);
  const [todos = [], dispatch] = useReducer(reducer, []);

  useTodos(dispatch, setFetch);

  const editTodo = async ({ _id, title }) => {
    dispatch({ type: 'edit-todo', payload: { _id, title } });
    await request('POST', `${_id}`, { title });
  };

  const handleDelete = async (todo) => {
    dispatch({
      type: 'delete-todo',
      payload: { completed: !todo.completed, _id: todo._id },
    });
    await request('DELETE', todo._id, todo);
  };

  const handleStatusChange = async ({ _id, completed }) => {
    dispatch({
      type: 'complete-todo',
      payload: { _id, completed: !completed },
    });
    await request('POST', `${_id}`, { completed: !completed });
  };

  return fetching ? (
    <Loading message={'Loading User Data'} />
  ) : (
    <ScrollView>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Heading size="lg">Your Todos</Heading>
        <Text fontSize="md" mb={4} color="trueGray.600" fontWeight="medium">
          Create and manage your todos
        </Text>
        <TodoInput todos={todos} dispatch={dispatch} />
        <VStack>
          {todos.map((todo) => (
            <Todo
              todo={todo}
              key={todo?._id}
              editTodo={editTodo}
              handleDelete={handleDelete}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </VStack>
      </Box>
    </ScrollView>
  );
}
