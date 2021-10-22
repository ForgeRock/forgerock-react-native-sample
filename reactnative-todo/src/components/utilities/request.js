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
import { API_URL } from 'react-native-dotenv';

const { FRAuthSampleBridge } = NativeModules;

async function request(method, resource = '', body = null) {
  console.log('API URL' + API_URL);
  const json = await FRAuthSampleBridge.getAccessToken();
  const tokens = JSON.parse(json);
  const { tokenType, value } = tokens;
  try {
    const res = await fetch(`${API_URL}todos/${resource}`, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        authorization: `${tokenType} ${value}`,
      },
    });
    if (method === 'DELETE') return;

    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

export { request };
