/*
 * forgerock-react-native-sample
 *
 * boolean.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import {
  VStack,
  FormControl,
  Checkbox,
  Text,
  Modal,
  useToken,
} from 'native-base';
import React, { useState, Fragment } from 'react';

import { handleFailedPolicies } from './utilities';

function TermsModal({ showModal, setModal, terms }) {
  const [primary] = useToken('colors', ['primary.600']);
  return (
    <Fragment>
      <Text onPress={() => setModal(true)} color={primary} pl={2} fontSize="md">
        Please accept our Terms and Conditions
      </Text>
      <Modal isOpen={showModal} onClose={() => setModal(false)}>
        <Modal.Content size="full">
          <Modal.CloseButton />
          <Modal.Header>Terms and Conditions</Modal.Header>
          <Modal.Body>{terms}</Modal.Body>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
}

export default function TermsAndConditions({ callback }) {
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /********************************************************************
   * JAVASCRIPT SDK INTEGRATION POINT
   * Summary: Utilize Callback methods
   * ------------------------------------------------------------------
   *  Details: Because we wrap our responses in FRStep using the Javascript SDK
   *  we have access to helper methods to set, and retrieve information from our response.
   *  Referencing these helper methods allows us to avoid managing the state
   *  in our own application and leverage the SDK to do so
   *  *************************************************************** */
  const isRequired = callback.isRequired ? callback.isRequired() : false;
  const error = handleFailedPolicies(
    callback.getPolicies ? callback.getPolicies() : [],
  );

  const label = callback.getPrompt ? callback.getPrompt() : null;
  const terms = callback.getTerms ? callback.getTerms() : null;

  if (callback.setValue) callback.setValue(checked);
  if (callback.setAccepted) callback.setAccepted(checked);

  return (
    <VStack mb={3}>
      {error ? <Text>{error}</Text> : null}
      <FormControl isRequired={isRequired}>
        <Checkbox.Group accessibilityLabel="terms-checkbox">
          <Checkbox
            aria-label="terms"
            isChecked={checked}
            onChange={() => setChecked(!checked)}
          >
            {terms !== null ? (
              <TermsModal
                showModal={showModal}
                setModal={setShowModal}
                terms={terms}
              />
            ) : (
              label
            )}
          </Checkbox>
        </Checkbox.Group>
      </FormControl>
    </VStack>
  );
}
