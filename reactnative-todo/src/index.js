/*
 * forgerock-sample-web-react
 *
 * index.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useEffect } from 'react';
import { NativeModules } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Theme from './theme/index';
import { AppContext, useGlobalStateMgmt } from './global-state';
import Router from './router';

const { FRAuthSampleBridge } = NativeModules;

export default function App() {
  const stateMgmt = useGlobalStateMgmt({});

  useEffect(() => {
    async function start() {
      await FRAuthSampleBridge.start();
    }
    start();
  }, []);

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
