/*
 * forgerock-react-native-sample
 *
 * todo.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { HStack, Menu, Text, Checkbox, Divider } from 'native-base';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EditModal from './edit-modal';

export default function Todo({
  editTodo,
  handleStatusChange,
  handleDelete,
  todo,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.Fragment>
      <Divider my={4} />
      <HStack justifyContent="space-between">
        <Checkbox
          accessibilityLabel="todos checkbox"
          isChecked={todo.completed}
          onChange={() => handleStatusChange(todo)}
          value={todo.title}
          size="sm"
        >
          <Text
            color={todo.completed ? 'muted.500' : 'darkText'}
            fontSize="lg"
            fontWeight="medium"
            ml={3}
            strikeThrough={todo.completed}
          >
            {todo.title}
          </Text>
        </Checkbox>
        <Menu
          p={2}
          placement="left"
          trigger={(triggerProps) => (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Icon size={25} name="dots-horizontal" />
            </Pressable>
          )}
        >
          <Menu.Item onPress={() => setShowModal(true)}>
            <Text fontSize="md">Edit</Text>
          </Menu.Item>
          <Menu.Item onPress={() => handleDelete(todo)}>
            <Text fontSize="md">Delete</Text>
          </Menu.Item>
        </Menu>
      </HStack>
      <EditModal
        editTodo={editTodo}
        setShowModal={setShowModal}
        showModal={showModal}
        todo={todo}
      />
    </React.Fragment>
  );
}
