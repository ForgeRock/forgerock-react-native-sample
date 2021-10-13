import React, { useState } from 'react';
import { Text, Input, Button, Modal } from 'native-base';

export const EditModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [text, onChange] = useState('');
  return (
    <React.Fragment>
      <Text onPress={() => setShowModal(true)} fontSize="sm">
        Edit
      </Text>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Todo</Modal.Header>
          <Modal.Body>
            <Input onChangeText={onChange} value={text} />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={async () => {
                  setShowModal(false);
                  await props.editTodo({ ...props.todo, title: text });
                  onChange('');
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
};
