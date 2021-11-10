/*
 * forgerock-react-native-sample
 *
 * mapper.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React from 'react';

import Choice from './choice';
import KBA from './kba';
import Password from './password';
import TermsAndConditions from './boolean';
import Text from './text';
import Unknown from './unknown';

export default function mapCallbacksToComponents(cb, idx) {
  const name = cb?.payload?.input?.[0].name;

  /** *********************************************************************
   * JAVASCRIPT SDK INTEGRATION POINT
   * Summary: SDK callback method for getting the callback type
   * ----------------------------------------------------------------------
   * Details: This method is helpful in quickly identifying the callback
   * when iterating through an unknown list of AM callbacks
   ********************************************************************* */
  switch (cb.getType()) {
    case 'ChoiceCallback':
      return <Choice callback={cb} key={name} />;
    case 'NameCallback':
    case 'ValidatedCreateUsernameCallback':
    case 'StringAttributeInputCallback':
      return <Text callback={cb} key={name} />;
    case 'PasswordCallback':
    case 'ValidatedCreatePasswordCallback':
      return <Password callback={cb} key={name} />;
    case 'BooleanAttributeInputCallback':
      return <TermsAndConditions callback={cb} key={name} />;
    case 'TermsAndConditionsCallback':
      return <TermsAndConditions callback={cb} key={name} />;
    case 'KbaCreateCallback':
      return <KBA callback={cb} key={name} />;
    default:
      // If current callback is not supported, render a warning message
      return <Unknown callback={cb} key={`unknown-${idx}`} />;
  }
}
