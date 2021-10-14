import React, { useEffect, useState } from 'react';
import { Form } from '../components/journey/form';

function Login() {
  return <Form action={{ type: 'login' }} />;
}

export { Login };
