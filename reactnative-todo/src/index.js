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
import { AppContext, useGlobalStateMgmt } from './hooks/global-state';
import Navigation from './navigation';

const { FRAuthSampleBridge } = NativeModules;

export default function App() {
  const stateMgmt = useGlobalStateMgmt({});

  useEffect(() => {
    /* *******************************************************************
     * NATIVE BRIDGE SDK INTEGRATION
     * Summary: Call Start Early!
     * -------------------------------------------------------------------
     * Details: It's important to start the FR SDK at the root level!
     * Start is needed to be called and resolved before
     * any other Native methods can be used
     *
     * use `start` as early on as possible!
     *
     *
     ********************************************************************/
    async function start() {
      await FRAuthSampleBridge.start();
    }
    start();
  }, []);

  return (
    <Theme>
      <AppContext.Provider value={stateMgmt}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </AppContext.Provider>
    </Theme>
  );
}
