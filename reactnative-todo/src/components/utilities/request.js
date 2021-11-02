/*
 * forgerock-react-native-sample
 *
 * request.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { NativeModules } from 'react-native';
/*
 * Please Ensure You Have Created A .env.js File
 * Use the .env.example.js as a copy!
 */
import { API_URL } from '../../../.env';

if (!API_URL) {
  console.error('*************** MISSING API URL *************');
  console.error('*************** CHECK .ENV.JS FILE IN ROOT *************');
  throw new Error('MISSING ENV VARIABLES, SEE .env.js FILE');
}

const { FRAuthSampleBridge } = NativeModules;

async function request(method, resource = '', body = null) {
  /*****************************************************************
   * NATIVE BRIDGE SDK INTEGRATION POINT
   * Summary: Checking for access token to make request
   * ------------------------------------------------------------------
   *  Details: Here we are checking for an existing access token in order to make
   *  a request for a protected resource.
   *  *************************************************************** */

  try {
    const json = await FRAuthSampleBridge.getAccessToken();
    const tokens = JSON.parse(json);
    const { tokenType, value } = tokens;
    // edit the url here in fetch with the url for your server
    const res = await fetch(`${API_URL}/todos/${resource}`, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        authorization: `${tokenType} ${value}`,
      },
    });
    if (method === 'DELETE') return;
    if (!res.ok) throw new Error(`Status ${res.status}: API request failed`);
    const response = await res.json();

    return response;
  } catch (err) {
    console.error('in request', err);
    FRAuthSampleBridge.logout();
  }
}

export { request };
