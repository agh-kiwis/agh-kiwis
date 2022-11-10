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
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Category, useGetCategoriesQuery } from '@agh-kiwis/data-access';
import { CustomSpinner } from '../Utils/CustomSpinner';

type ColorPickerProps = {
  modalTitle: string;
  name: string;
  children: React.ReactNode;
  handleChange: (fieldName: string, value: number | string) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  modalTitle,
  name,
  children,
  handleChange,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const { data, loading } = useGetCategoriesQuery();

  const renderTiles = (categories: Category[]): JSX.Element => (
    <SimpleGrid spacing={4}>
      {categories.map((category) => (
        <Box
          key={category.id}
          w="180px"
          h="60px"
          bg={category.color.hexCode}
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius={4}
          onClick={() => {
            handleChange(name, category.id);
            handleChange('category.name', category.name);
            handleChange('category.color', category.color.hexCode);
            onClose();
          }}
        >
          {category.name}
        </Box>
      ))}
    </SimpleGrid>
  );

  if (loading) {
    return <CustomSpinner />;
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
            <VStack justify="center">{renderTiles(data.getCategories)}</VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
