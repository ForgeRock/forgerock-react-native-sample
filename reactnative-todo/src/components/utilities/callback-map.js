import React from 'react';
import { Username } from '../common/username';
import { Password } from '../common/password';
import { KBA } from '../register/kba';
import { TextField } from '../register/text-field';
import { Specials } from '../register/specials';

const callbackTypeToComponent = {
  ValidatedCreateUsernameCallback: ({ callback }) => (
    <Username key={callback._id} callback={callback} />
  ),
  StringAttributeInputCallback: ({ callback }) => (
    <TextField key={callback._id} callback={callback} />
  ),
  BooleanAttributeInputCallback: ({ callback }) => (
    <Specials key={callback._id} callback={callback} />
  ),
  ValidatedCreatePasswordCallback: ({ callback }) => (
    <Password key={callback._id} callback={callback} />
  ),
  TermsAndConditionsCallback: ({ callback }) => (
    <Specials key={callback._id} callback={callback} />
  ),
  KbaCreateCallback: ({ callback }) => (
    <KBA key={callback._id} callback={callback} />
  ),
};

export { callbackTypeToComponent };
