import React from 'react';
import { View } from 'react-native';
import { VStack, Button, Text, useToken } from 'native-base';
import { Link } from '@react-navigation/native';

function Footer({ handleSubmit }) {
  const [primary] = useToken('colors', ['primary.600']);
  const textStyle = {
    textAlign: 'center',
  };
  const linkStyle = {
    color: primary,
    textDecorationLine: 'underline',
  };
  return (
    <>
      <VStack space={2}>
        <Button onPress={handleSubmit}>Sign in</Button>
      </VStack>
      <View>
        <Text fontSize="sm" style={textStyle}>
          Don't have an account?{' '}
          <Link to={{ screen: 'Sign Up' }} style={linkStyle}>
            Sign up here!
          </Link>
        </Text>
      </View>
    </>
  );
}

export { Footer };
