/*
 * forgerock-react-native-sample
 *
 * login.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useEffect, useState } from 'react';
import { Form } from '../components/journey/form';

function Login() {
  return <Form action={{ type: 'login' }} />;
}

export { Login };
