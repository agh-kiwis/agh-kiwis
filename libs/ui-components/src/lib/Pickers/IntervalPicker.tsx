import React from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { CustomNumberInput } from '@agh-kiwis/ui-components';

export type NumberInputType = {
  label: string;
  name: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  step: number;
};

type IntervalPickerProps = {
  modalTitle: string;
  children: React.ReactNode;
  handleChange: (fieldName: string, value: number) => void;
  inputFields: NumberInputType[];
};

export const IntervalPicker: React.FC<IntervalPickerProps> = ({
  modalTitle,
  children,
  handleChange,
  inputFields,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const renderInputFields = (inputFields: NumberInputType[]): JSX.Element[] =>
    inputFields.map((field) => (
      <CustomNumberInput
        key={field.name}
        minValue={field.minValue}
        maxValue={field.maxValue}
        defaultValue={field.defaultValue}
        step={field.step}
        label={field.label}
        name={field.name}
        handleChange={handleChange}
      />
    ));

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
            <VStack justify="center">{renderInputFields(inputFields)}</VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
