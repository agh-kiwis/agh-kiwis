import { Button } from '@chakra-ui/react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FilterOptions } from '@agh-kiwis/ui-components';

type FilterModalProps = {
  isOpen: boolean;
  close: () => void;
};
// TODO implement filtering logic (mocked currently)
export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>Filter options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FilterOptions />
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={close}>
            Close
          </Button>
          <Button>Apply filters</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
