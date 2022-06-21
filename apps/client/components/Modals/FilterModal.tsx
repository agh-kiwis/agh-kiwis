import { Button } from '@chakra-ui/react';
import { FilterOptions } from '../TodoList/FilterOptions';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

// TODO implement filtering logic (mocked currently)
export const FilterModal = ({ isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FilterOptions />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={close}>
            Close
          </Button>
          <Button colorScheme="blue">Apply filters</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
