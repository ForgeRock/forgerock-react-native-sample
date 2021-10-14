import React, { useEffect, useState } from 'react';
import { Form } from '../components/common/form';
import { NativeModules } from 'react-native';
const { FRAuthBridge } = NativeModules;

function Login() {
  return <Form action={{ type: 'login' }} />;
}

export { Login };
