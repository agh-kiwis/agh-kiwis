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
  Spinner,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useGetColorsQuery } from '@agh-kiwis/data-access';

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

  const { data, loading } = useGetColorsQuery();

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

  if (loading) {
    return <Spinner />;
  }
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
              {renderTiles(data.getColors.map((object) => object.hexCode))}
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
