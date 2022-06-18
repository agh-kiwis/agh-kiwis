import React from 'react';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

type ColorPickerProps = {
  modalTitle: string;
  name: string;
  children: React.ReactNode;
  handleChange: (fieldName: string, value: string) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  modalTitle,
  name,
  children,
  handleChange,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const colors: string[] = [
    '#1EA896',
    '#0077B6',
    '#FF8C42',
    '#38A169',
    '#E0479E',
    '#F9DC5C',
  ];

  const renderTiles = (colors: string[]): JSX.Element => (
    <SimpleGrid columns={2} spacing={4}>
      {colors.map((color) => (
        <Box
          key={color}
          w="60px"
          h="60px"
          bg={color}
          borderRadius={4}
          onClick={() => {
            handleChange(name, color);
            onClose();
          }}
        />
      ))}
    </SimpleGrid>
  );

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
            <VStack justify="center">{renderTiles(colors)}</VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
