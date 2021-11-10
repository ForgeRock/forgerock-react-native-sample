import React, { useContext, useEffect } from 'react';
import { NativeModules } from 'react-native';

import { AppContext } from '../hooks/global-state';
import Loading from '../components/utilities/loading';

const { FRAuthSampleBridge } = NativeModules;

export default function Logout() {
  const [, setAuthentication] = useContext(AppContext);
  useEffect(() => {
    /** *********************************************************************
     * NATIVE BRIDGE SDK INTEGRATION POINT
     * Summary: Call Logout
     * ----------------------------------------------------------------------
     * Details: We can utilize the logout method to completely
     * revoke existing access artifacts on ForgeRock
     * ******************************************************************** */

    async function logout() {
      await FRAuthSampleBridge.logout();
      setAuthentication(false);
    }
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading message="You're being logged out ..." />;
}
