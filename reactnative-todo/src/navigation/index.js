/*
 * forgerock-react-native-sample
 *
 * index.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext, useEffect } from 'react';
import { NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Theme from '../theme/index';
import { AppContext, useGlobalStateMgmt } from '../global-state';
import { useToggle } from '../hooks/use-toggle';
import { LoginRoutes, TodoRoutes } from '../navigation/routes';

const { FRAuthBridge } = NativeModules;

function Navigation() {
  const [auth, setAuth] = useToggle(false);

  useEffect(() => {
    async function checkForToken() {
      try {
        if (!auth) {
          const token = await FRAuthBridge.getAccessToken();
          setAuth(Boolean(token));
        }
      } catch (err) {
        console.log('the error', err);
      }
    }
    checkForToken();
  }, [auth]);

  const stateMgmt = useGlobalStateMgmt({
    isAuthenticated: auth,
  });

  const [{ isAuthenticated }] = stateMgmt;

  return (
    <Theme>
      <AppContext.Provider value={stateMgmt}>
        <NavigationContainer isAuthenticated={isAuthenticated}>
          <RootNavigator />
        </NavigationContainer>
      </AppContext.Provider>
    </Theme>
  );
}

function RootNavigator() {
  const [{ isAuthenticated }] = useContext(AppContext);

  return isAuthenticated ? <TodoRoutes /> : <LoginRoutes />;
}

export default Navigation;
