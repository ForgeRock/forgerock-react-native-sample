import React from 'react';
import { Center, Heading, Text, useToken } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from '@react-navigation/native';

function Header() {
  const [primary] = useToken('colors', ['primary.600']);
  const linkStyle = {
    color: primary,
    textDecorationLine: 'underline',
  };
  return (
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
