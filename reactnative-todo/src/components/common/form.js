import React, { useContext } from 'react';
import { Button, Box, FormControl, ScrollView } from 'native-base';

import { Header } from './header';
import { useJourneyHandler } from '../../hooks/journey-hook';
import { Loading } from '../utilities/loading';
import { mapCallbacksToComponents } from '../common/mapComponentsToCallback';

function Form({ action }) {
  const [
    { formFailureMessage, renderStep, submittingForm },
    { setSubmissionStep, setSubmittingForm },
  ] = useJourneyHandler({ action });

  console.log(renderStep);

  return submittingForm ? (
    <Loading message={'Checking your session'} />
  ) : (
    <ScrollView>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Header type={action.type} />
        <FormControl>
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
            Register
          </Button>
        </FormControl>
      </Box>
    </ScrollView>
  );
}

export { Form };
