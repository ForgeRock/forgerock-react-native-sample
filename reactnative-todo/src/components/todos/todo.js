import * as React from 'react';
import { Pressable } from 'react-native';
import {
  Box,
  HStack,
  Menu,
  Center,
  Text,
  VStack,
  Checkbox,
  Divider,
  ScrollView,
} from 'native-base';
import { EditModal } from './edit-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Todo({ todo, handleStatusChange, handleDelete, editTodo }) {
  return (
    <React.Fragment>
      <Divider my={6} />
      <HStack justifyContent="space-between">
        <Checkbox
          isChecked={todo.completed}
          onChange={() => handleStatusChange(todo)}
          value={todo.title}
          accessibilityLabel="todos checkbox">
          <Text ml={3} strikeThrough={todo.completed} fontSize="xl">
            {todo.title}
          </Text>
        </Checkbox>
        <Menu
          closeOnSelect={true}
          alignItems="center"
          justifyContent="center"
          placement={'right'}
          trigger={(triggerProps) => (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Icon size={25} name="dots-horizontal" />
            </Pressable>
          )}>
          <Menu.Item
            closeOnSelect={true}
            alignItems={'flex-start'}
            onPress={() => handleDelete(todo)}>
            <Text fontSize="sm">Delete</Text>
          </Menu.Item>
          <Menu.Item
            closeOnSelect={true}
            alignItems={'flex-start'}
            onPress={() => editTodo(todo)}>
            <EditModal todo={todo} editTodo={editTodo} />
          </Menu.Item>
        </Menu>
      </HStack>
    </React.Fragment>
  );
}

function Todos(props) {
  return (
    <VStack>
      {props.todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo._id}
          editTodo={props.editTodo}
          handleDelete={props.handleDelete}
          handleStatusChange={props.handleStatusChange}
        />
      ))}
    </VStack>
  );
}

export { Todos };
