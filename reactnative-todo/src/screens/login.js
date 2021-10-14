import React, { useEffect, useState } from 'react';
import { Form } from '../components/common/form';

function Login() {
  return <Form action={{ type: 'login' }} />;
}

export { Login };
