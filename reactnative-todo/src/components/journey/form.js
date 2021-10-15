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
import { Button, Box, FormControl, ScrollView } from 'native-base';
import { Header } from './header';
import { Loading } from '../utilities/loading';
import { useJourneyHandler } from '../../hooks/journey-hook';
import { mapCallbacksToComponents } from '../journey/map-components-to-callback';

function Form({ action }) {
  const {
    formFailureMessage,
    renderStep,
    submittingForm,
    setSubmissionStep,
    setSubmittingForm,
  } = useJourneyHandler({ action });

  return submittingForm ? (
    <Loading message={'Checking your session'} />
  ) : (
    <ScrollView>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Header type={action.type} />
        <FormControl isInvalid={formFailureMessage}>
          <FormControl.ErrorMessage>
            {formFailureMessage}
          </FormControl.ErrorMessage>
          {renderStep
            ? renderStep.callbacks.map((callback, idx) =>
                mapCallbacksToComponents(callback, idx),
              )
            : []}
          <Button
            onPress={() => {
              setSubmittingForm(true);
              setSubmissionStep(renderStep);
            }}
          >
            {action.type === 'login' ? 'Login' : 'Register'}
          </Button>
        </FormControl>
      </Box>
    </ScrollView>
  );
}

export { Form };
