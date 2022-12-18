import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { NumberInputType } from '../Pickers/IntervalPicker';
import { CustomNumberInput } from './CustomNumberInput';

type FormModalProps = {
  finalRef: any;
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  inputFields: NumberInputType[];
  handleChange: (fieldName: string, value: number) => void;
};

export const FormModal: React.FC<FormModalProps> = ({
  finalRef,
  isOpen,
  onClose,
  modalTitle,
  inputFields,
  handleChange,
}) => {
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
  );
};
