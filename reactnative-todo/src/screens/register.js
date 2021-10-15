/*
 * forgerock-react-native-sample
 *
 * register.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React from 'react';
import { Form } from '../components/journey/form';

function Register() {
  return <Form action={{ type: 'register' }} />;
}

export { Register };
