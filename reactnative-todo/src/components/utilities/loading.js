/*
 * forgerock-sample-web-react
 *
 * loading.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';
import { Box, Spinner, Center, Heading, ScrollView } from 'native-base';

/**
 * @function Loading - Used to display a loading message
 * @param {Object} props - The object representing React's props
 * @param {string} props.message - The message string object passed from the parent component
 * @returns {Object} - React component object
 */
function Loading({ message }) {
  return (
    <ScrollView>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Center space={4} alignItems="center" justifyContent={'center'}>
          <Spinner size="lg" />
          <Heading textAlign="center" mt="10" size="lg">
            {message}
          </Heading>
        </Center>
      </Box>
    </ScrollView>
  );
}

export { Loading };
