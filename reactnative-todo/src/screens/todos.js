/*
 * forgerock-react-native-sample
 *
 * todos.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from 'react';
import { TodoContainer } from '../components/todos';

function Todos() {
  return <TodoContainer addTodo={() => {}} />;
}

export { Todos };
