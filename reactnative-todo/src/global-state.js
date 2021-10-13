/*
 * forgerock-sample-web-react
 *
 * state.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React, { useState } from 'react';
import { NativeModules } from 'react-native';
const { FRAuthBridge } = NativeModules;

/**
 * @function useStateMgmt - The global state/store for managing user authentication and page
 * @param {Object} props - The object representing React's props
 * @param {Object} props.email - User's email
 * @param {Object} props.isAuthenticated - Boolean value of user's auth status
 * @param {Object} props.prefersDarkTheme - User theme setting
 * @param {Object} props.username - User's username
 * @returns {Array} - Global state values and state methods
 */
export function useGlobalStateMgmt({ isAuthenticated = false }) {
  /**
   * Create state properties for "global" state.
   * Using internal names that differ from external to prevent shadowing.
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [authenticated, setAuthentication] = useState(isAuthenticated);

  /**
   * @function setAuthenticationWrapper - A wrapper for storing authentication in sessionStorage
   * @param {boolean} value - current user authentication
   * @returns {void}
   */
  async function setAuthenticationWrapper(value) {
    if (value === false) {
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Logout, end session and revoke tokens
       * ----------------------------------------------------------------------
       * Details: Since this method is a global method via the Context API,
       * any part of the application can log a user out. This is helpful when
       * APIs are called and we get a 401 response.
       ********************************************************************* */
      await FRAuthBridge.logout();
    }

    setAuthentication(value);
  }
  /**
   * returns an array with state object as index zero and setters as index one
   */
  return [
    {
      isAuthenticated: authenticated,
    },
    {
      setAuthentication: setAuthenticationWrapper,
    },
  ];
}

/**
 * @constant AppContext - Creates React Context API
 * This provides the capability to set a global state in React
 * without having to pass the state as props through parent-child components.
 */
export const AppContext = React.createContext([{}, {}]);
