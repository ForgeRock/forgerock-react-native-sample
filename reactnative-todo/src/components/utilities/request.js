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
const { FRAuthSampleBridge } = NativeModules;

async function request(method, resource = '', body = null) {
  const json = await FRAuthSampleBridge.getAccessToken();
  const tokens = JSON.parse(json);
  const { tokenType, value } = tokens;
  try {
    // edit the url here in fetch with the url for your server
    const res = await fetch(`https://api.example.com:9443/todos/${resource}`, {
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
    console.error(err, err.message);
  }
}

export { request };
