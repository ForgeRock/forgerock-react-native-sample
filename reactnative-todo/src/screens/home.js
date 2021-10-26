/*
 * forgerock-react-native-sample
 *
 * home.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';
import { Box, Heading, ScrollView, Text } from 'native-base';

function Home() {
  return (
    <ScrollView>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Heading size="lg">Protect with ForgeRock;</Heading>
        <Heading size="lg">Develop with React Native</Heading>
        <Text fontSize="xl" fontWeight="bold" mt={6}>
          Learn how to develop ForgeRock protected, hybrid apps with the React
          Native library and our Native SDKs.
        </Text>
        <Heading size="md" fontWeight="regular" mt={6}>
          About this project
        </Heading>
        <Text fontSize="md" mt={3}>
          The purpose of this sample app is to demonstrate how the ForgeRock
          SDKs can be leveraged within a fully-functional React Native
          application. Included in this sample app is a sample bridging layer
          for connecting the native ForgeRock modules (Android and iOS) with the
          React Native layer along with a "light" use of the JavaScript SDK for
          better ergonomics.
        </Text>
      </Box>
    </ScrollView>
  );
}
export { Home };
