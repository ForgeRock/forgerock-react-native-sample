/*
 * forgerock-reactnative-sample
 *
 * index.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React from 'react';
import { KBA } from './kba';
import { Password } from './password';
import { TermsAndConditions } from './boolean';
import { Username } from './username';
import { TextField } from './text-field';

function mapCallbacksToComponents(cb, idx) {
  const name = cb?.payload?.input?.[0].name;
  /** *********************************************************************
   * Web SDK INTEGRATION POINT
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
      return <Username callback={cb} key={name} />;
    case 'StringAttributeInputCallback':
      return <TextField callback={cb} key={name} />;
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

export { mapCallbacksToComponents };
