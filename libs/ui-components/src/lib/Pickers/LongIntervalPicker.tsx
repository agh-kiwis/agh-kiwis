import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { CustomNumberInput } from '@agh-kiwis/ui-components';

export type LongIntervalSelectType = {
  name: string;
  label: string;
  options: string[];
};

export type LongIntervalAmountType = {
  label: string;
  name: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
  step: number;
};

type LongIntervalPickerProps = {
  modalTitle: string;
  children: React.ReactNode;
  handleChange: (fieldName: string, value: string | number) => void;
  selectField: LongIntervalSelectType;
  amountFields: LongIntervalAmountType[];
  selectValue: string;
};

export const LongIntervalPicker: React.FC<LongIntervalPickerProps> = ({
  modalTitle,
  children,
  handleChange,
  selectField,
  amountFields,
  selectValue,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const renderSelect = (
    selectField: LongIntervalSelectType,
    amountFields: LongIntervalAmountType[]
  ): JSX.Element => {
    const correspondingField = amountFields.find(
      (field) => field.label === selectValue
    );

    return (
      <VStack justify="center">
        <Flex justify="center" align="center">
          <CustomNumberInput
            key={correspondingField.name}
            minValue={correspondingField.minValue}
            maxValue={correspondingField.maxValue}
            defaultValue={correspondingField.defaultValue}
            step={correspondingField.step}
            label="Amount"
            name={correspondingField.name}
            handleChange={handleChange}
          />
        </Flex>
        <Flex justify="center" align="center">
          <Box w="80px">
            <FormLabel htmlFor={selectField.name}>
              {selectField.label}
            </FormLabel>
          </Box>
          <Select
            w="180px"
            onChange={(e) => handleChange(selectField.name, e.target.value)}
          >
            {selectField.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Flex>
      </VStack>
    );
  };

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
              <Flex justify="center" align="center">
                {renderSelect(selectField, amountFields)}
              </Flex>
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
