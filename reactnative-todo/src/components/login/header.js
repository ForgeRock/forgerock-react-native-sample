import React from 'react';
import { Center, Heading } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Header() {
  return (
    <React.Fragment>
      <Center>
        <Icon name="key" size={72} color={'#c0c9d5'} />
        <Heading size="lg">Sign in</Heading>
      </Center>
    </React.Fragment>
  );
}

export { Header };
