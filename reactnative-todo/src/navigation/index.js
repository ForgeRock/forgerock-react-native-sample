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
import { LoginRoutes, TodoRoutes } from '../navigation/routes';

const { FRAuthSampleBridge } = NativeModules;

function Navigation() {
  const stateMgmt = useGlobalStateMgmt({
    isAuthenticated: false,
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
  const [{ isAuthenticated }, { setAuthentication }] = useContext(AppContext);
  useEffect(() => {
    async function checkForToken() {
      try {
        const token = await FRAuthSampleBridge.getAccessToken();
        setAuthentication(Boolean(token));
      } catch (err) {
        console.log('the error', err);
      }
    }
    checkForToken();
  }, [isAuthenticated]);
  return isAuthenticated ? <TodoRoutes /> : <LoginRoutes />;
}

export default Navigation;
