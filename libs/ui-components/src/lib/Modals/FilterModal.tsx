import { FilterOptions } from '@agh-kiwis/ui-components';
import { Button } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

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
