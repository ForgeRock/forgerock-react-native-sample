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
          About this project The purpose of this sample web app is to
          demonstrate how the ForgeRock JavaScript SDK is implemented within a
          fully-functional application using a popular framework. The source
          code for this project can be found on Github and run locally for
          experimentation. For more on our SDKs, you can find our official SDK
          documentation here.
        </Text>
      </Box>
    </ScrollView>
  );
}
export { Home };
