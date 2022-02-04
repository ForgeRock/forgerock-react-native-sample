/*
 * forgerock-sample-web-react
 *
 * index.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Theme from './theme/index';
import { AppContext, useGlobalStateMgmt } from './global-state';
import Router from './router';

export default function App() {
  const stateMgmt = useGlobalStateMgmt({});

  return (
    <Theme>
      <AppContext.Provider value={stateMgmt}>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </AppContext.Provider>
    </Theme>
  );
}
