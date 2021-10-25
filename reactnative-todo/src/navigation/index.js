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
  const [isAuthenticated, setAuthentication] = useContext(AppContext);
  useEffect(() => {
    async function checkForToken() {
      try {
        /** *********************************************************************
         * NATIVE BRIDGE SDK INTEGRATION POINT
         * Summary: Get OAuth/OIDC tokens with Authorization Code Flow w/PKCE.
         * ----------------------------------------------------------------------
         * Details: Since we have successfully authenticated the user, we can now
         * get the OAuth2/OIDC tokens.
         * ******************************************************************** */

        const token = await FRAuthSampleBridge.getAccessToken();
        setAuthentication(Boolean(token));
      } catch (err) {
        /**
         * Native Bridge SDK Integration Point
         * Summary: Logging out user if we fail to get user info at this point
         * ------------------------------------------------------------------
         *  Details: If we throw here, we want to clear out any state so that
         *  we can continue to re render the page with a clean state
         *  *************************************************************** */

        await FRAuthSampleBridge.logout();
      }
    }
    checkForToken();
  }, [isAuthenticated]);

  return isAuthenticated ? <TodoRoutes /> : <LoginRoutes />;
}

export default Navigation;
