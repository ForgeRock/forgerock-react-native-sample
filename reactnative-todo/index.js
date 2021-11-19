/*
 * forgerock-react-native-sample
 *
 * index.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

/**
 * Removes warnings about cyclical dependencies
 * Since this is a demo app, we are turning this off
 */
LogBox.ignoreLogs(['Require cycle:'])

AppRegistry.registerComponent(appName, () => App);
