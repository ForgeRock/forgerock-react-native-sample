import React, { useReducer } from 'react';
import { Box, Center, Heading, ScrollView, Text } from 'native-base';
import { Todos } from './todo';
import { TodoInput } from './todo-input';
import { useToggle } from '../../hooks/use-toggle';
import { useTodos } from '../../hooks/use-todos';
import { reducer } from './reducer';
import { request } from '../utilities/request';
import { Loading } from '../utilities/loading';

function TodoContainer() {
  const [fetching, setFetch] = useToggle(false);
  const [todos, dispatch] = useReducer(reducer, []);

  useTodos(dispatch, setFetch, todos);

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
        <Text fontSize="md" mb={4}>
          Create and manage your todos
        </Text>
        <TodoInput todos={todos} dispatch={dispatch} />
        <Todos
          todos={todos}
          editTodo={editTodo}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
      </Box>
    </ScrollView>
  );
}

export { TodoContainer };
