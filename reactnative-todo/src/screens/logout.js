/*
 * forgerock-react-native-sample
 *
 * logout.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext, useEffect } from 'react';
import { NativeModules } from 'react-native';

import { AppContext } from '../global-state';
import Loading from '../components/utilities/loading';

const { FRAuthSampleBridge } = NativeModules;

export default function Logout() {
  const [_, { setAuthentication }] = useContext(AppContext);

  useEffect(() => {
    async function logoutUser() {
      try {
        await FRAuthSampleBridge.logout();
      } catch (err) {
        console.error(`Error: logout; ${err}`);
      }
      setAuthentication(false);
    }
    logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading message="You're being logged out ..." />;
}
