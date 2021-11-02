/*
 * forgerock-sample-web-react
 *
 * constants.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Buffer } from 'buffer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import * as constants from '../.env.js';

const certsUrl = new URL('../', import.meta.url);
const certsPath = fileURLToPath(certsUrl);

export const AM_URL = (() => {
  try {
    const lastChar = constants.AM_URL.slice(-1);
    if (lastChar !== '/') {
      return constants.AM_URL + '/';
    }
    return constants.AM_URL;
  } catch (err) {
    console.error('ERROR: Missing .env value. Ensure you have an .env file within the dir of this sample app.');
    return '';
  }
})();

export const CONFIDENTIAL_CLIENT = Buffer.from(
  `${constants.REST_OAUTH_CLIENT}:${constants.REST_OAUTH_SECRET}`
).toString('base64');

export const PORT = constants.PORT || 9443;

export const REALM_PATH = constants.REALM_PATH;

export const SEC_KEY = (() => {
  try {
    return constants.SEC_KEY
      ? constants.SEC_KEY.replace(/\\n/gm, '\n')
      : readFileSync(certsPath + constants.SEC_KEY_FILE).toString('utf8');
  } catch (err) {
    console.error('ERROR: Missing .env value. Ensure you have an .env file within the dir of this sample app.');
    return '';
  }
})();

export const SEC_CERT = (() => {
  try {
    return constants.SEC_CERT
      ? constants.SEC_CERT.replace(/\\n/gm, '\n')
      : readFileSync(certsPath + constants.SEC_CERT_FILE).toString('utf8');
  } catch (err) {
    console.error('ERROR: Missing .env value. Ensure you have an .env file within the dir of this sample app.');
    return '';
  }
})();
