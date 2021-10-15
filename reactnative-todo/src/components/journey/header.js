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
import { useToken, Center, Heading, Text } from 'native-base';
import { Link } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Header({ type }) {
  const [primary] = useToken('colors', ['primary.600']);
  const linkStyle = {
    color: primary,
    textDecorationLine: 'underline',
  };

  return type === 'login' ? (
    <Center>
      <Icon name="key" size={72} color={'#c0c9d5'} />
      <Heading size="lg">Sign In</Heading>
      <Text>
        {"Don't have an account?"}{' '}
        <Link to={{ screen: 'Sign Up' }} style={linkStyle}>
          Register
        </Link>
      </Text>
    </Center>
  ) : (
    <Center marginBottom={4}>
      <Icon name="account-plus" size={72} color={'#c0c9d5'} />
      <Heading size="lg">Sign Up</Heading>
      <Text fontSize="sm">
        Already have an account?{' '}
        <Link to={{ screen: 'Sign In' }} style={linkStyle}>
          Sign in here!
        </Link>
      </Text>
    </Center>
  );
}

export { Header };
