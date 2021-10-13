import React, { useState, Fragment } from 'react';
import { VStack, Checkbox, Text, Modal, useToken } from 'native-base';
import { handleFailedPolicies } from '../utilities/failed-policies';

function TermsModal({ terms, showModal, setModal }) {
  const [primary] = useToken('colors', ['primary.600']);
  return (
    <Fragment>
      <Text onPress={() => setModal(true)} color={primary} pl={2} fontSize="md">
        Please accept our Terms and Conditions
      </Text>
      <Modal isOpen={showModal} onClose={() => setModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Terms and Conditions</Modal.Header>
          <Modal.Body>{terms}</Modal.Body>
        </Modal.Content>
      </Modal>
    </Fragment>
  );
}

const Specials = ({ callback }) => {
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      <Checkbox.Group accessibilityLabel="terms-checkbox">
        <Checkbox
          onChange={() => setChecked(!checked)}
          isChecked={checked}
          aria-label="terms"
        >
          {terms !== null ? (
            <TermsModal
              terms={terms}
              showModal={showModal}
              setModal={setShowModal}
            />
          ) : (
            label
          )}
        </Checkbox>
      </Checkbox.Group>
    </VStack>
  );
};

export { Specials };
