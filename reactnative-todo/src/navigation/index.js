/*
 * forgerock-react-native-sample
 *
 * index.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppContext } from '../hooks/global-state';
import {
  AuthenticatedRoutes,
  UnauthenticatedRoutes,
} from '../navigation/routes';

export default function Navigation() {
  // Used for setting global authentication state
  const [isAuthenticated] = useContext(AppContext);

  return (
    <NavigationContainer isAuthenticated={isAuthenticated}>
      {isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </NavigationContainer>
  );
}
