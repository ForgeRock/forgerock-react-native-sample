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
import Navigation from './navigation';

const { FRAuthSampleBridge } = NativeModules;

export default function App() {
  useEffect(() => {
    /* *******************************************************************
     * Native Bridge SDK Integration
     * It's important to start the FR SDK at the root level!
     * Start is needed to be called and resolved before
     * any other Native methods can be used
     ********************************************************************/
    async function start() {
      await FRAuthSampleBridge.start();
    }
    start();
  }, []);
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
