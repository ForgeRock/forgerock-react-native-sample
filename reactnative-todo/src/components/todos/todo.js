/*
 * forgerock-react-native-sample
 *
 * todo.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import * as React from 'react';
import { Pressable } from 'react-native';
import { HStack, Menu, Text, Checkbox, Divider } from 'native-base';
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
          accessibilityLabel="todos checkbox"
        >
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
          )}
        >
          <Menu.Item
            closeOnSelect={true}
            alignItems={'flex-start'}
            onPress={() => handleDelete(todo)}
          >
            <Text fontSize="sm">Delete</Text>
          </Menu.Item>
          <Menu.Item
            closeOnSelect={true}
            alignItems={'flex-start'}
            onPress={() => editTodo(todo)}
          >
            <EditModal todo={todo} editTodo={editTodo} />
          </Menu.Item>
        </Menu>
      </HStack>
    </React.Fragment>
  );
}

export { Todo };
