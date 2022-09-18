import React from 'react';
import {
  Box,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { CustomDateTimeInput } from '@agh-kiwis/ui-components';

type DateTimePickerProps = {
  modalTitle: string;
  label: string;
  name: string;
  children: React.ReactNode;
  handleChange: (fieldName: string, value: string) => void;
};

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  modalTitle,
  label,
  name,
  children,
  handleChange,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack justify="center">
              <FormControl>
                <VStack>
                  <CustomDateTimeInput
                    type="date"
                    label="Date"
                    name={`${name}.date`}
                    handleChange={handleChange}
                  />

                  <CustomDateTimeInput
                    type="time"
                    label="Time"
                    name={`${name}.time`}
                    handleChange={handleChange}
                  />
                </VStack>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
