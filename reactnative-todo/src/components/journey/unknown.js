import React from 'react';
import { FormControl } from 'native-base';

/**
 * @function Unknown- React component used for displaying Unknown callback
 * @returns {Object} - React component object
 */
function Unknown({ callback }) {
  const callbackType = callback.getType();
  return (
    <FormControl isInvalid>
      <FormControl.ErrorMessage>{`Warning: unknown callback type, ${callbackType}, isn't handled`}</FormControl.ErrorMessage>
    </FormControl>
  );
}

export { Unknown };
