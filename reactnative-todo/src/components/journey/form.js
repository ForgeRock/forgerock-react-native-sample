/*
 * forgerock-react-native-sample
 *
 * form.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import {
  Button,
  Box,
  FormControl,
  ScrollView,
  Spinner,
  Text,
} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Loading from '../utilities/loading';
import useJourneyHandler from '../../hooks/journey-state';
import mapCallbacksToComponents from '../journey/mapper';

export default function Form({ action, bottomMessage, children }) {
  /**
   * Call custom hook to handle the state management and request
   * orchestration for the iterative process between a client
   * and the ForgeRock server.
   */
  const {
    formFailureMessage,
    renderStep,
    isProcessingForm,
    setSubmissionStep,
    setProcessingForm,
  } = useJourneyHandler({ action });

  return !renderStep ? (
    <Loading message={'Checking your session'} />
  ) : (
    <ScrollView>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        {children}
        <FormControl isInvalid={formFailureMessage}>
          <FormControl.ErrorMessage leftIcon={<Icon name="alert" size={18} />}>
            {formFailureMessage}
          </FormControl.ErrorMessage>
          {
            /**
             * Map over the callbacks in renderStep and render the appropriate
             * component for each one.
             */
            renderStep.callbacks.map(mapCallbacksToComponents)
          }
          <Button
            onPress={() => {
              setProcessingForm(true);
              setSubmissionStep(renderStep);
            }}
            size="lg"
          >
            {
              /**
               * Render a small spinner during submission calls
               */
              isProcessingForm ? (
                <Spinner color="white" />
              ) : (
                <Text color="white" fontWeight="medium">
                  {action.type === 'login' ? 'Login' : 'Register'}
                </Text>
              )
            }
          </Button>
          {bottomMessage}
        </FormControl>
      </Box>
    </ScrollView>
  );
}
