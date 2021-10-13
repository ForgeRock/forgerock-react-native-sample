import { NativeModules } from 'react-native';
import { useEffect, useState } from 'react';

const { FRAuthBridge } = NativeModules;
/**
 * @function useAuthValidation - Custom hook for validating user authentication
 * @param {boolean} auth - client state on whether user is authenticated
 * @param {function} setAuth - global state method for setting user authentication status
 * returns {Array}
 */
function useAuthValidation(auth, setAuth) {
  /**
   * React state "hook"
   *
   * This has three possible states: 'unknown', 'valid' and 'invalid'.
   */
  const [isValid, setValid] = useState('unknown');

  useEffect(() => {
    async function validateAccessToken() {
      /**
       * First, check to see if the user has recently been authenticated
       */
      if (auth) {
        /**
         * If we they have been authenticated, validate that assumption
         */
        try {
          /** *****************************************************************
           * SDK INTEGRATION POINT
           * Summary: Optional client-side route access validation
           * ------------------------------------------------------------------
           * Details: Here, you could just make sure tokens exist –
           * TokenStorage.get() – or, validate tokens, renew expiry timers,
           * session checks ... Below, we are calling the userinfo endpoint to
           * ensure valid tokens before continuing, but it's optional.
           ***************************************************************** */
          if (DEBUGGER) debugger;
          const tokens = await FRAuthBridge.getAccessToken();
          if (tokens) setValid('valid');
          else setValid('invalid');
        } catch (err) {
          setAuth(false);
          setValid('invalid');
        }
      } else {
        /**
         * If we have no record of their authenticated, no need to call the server
         */
        setValid('invalid');
      }
    }

    validateAccessToken();
    // Only `auth` is mutable, all others, even `setAuth` are "stable"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return [
    {
      isValid,
    },
  ];
}

export { useAuthValidation };
