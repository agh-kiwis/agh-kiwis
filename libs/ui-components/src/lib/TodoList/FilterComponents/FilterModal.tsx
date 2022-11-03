import { Dispatch, SetStateAction } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Filters } from './Filters';
import { FilterInterface } from './filterConstants';

type FilterModalProps = {
  isOpen: boolean;
  close: () => void;
  filters: FilterInterface[];
  setFilters: Dispatch<SetStateAction<FilterInterface[]>>;
};

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  close,
  filters,
  setFilters,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>Filter options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Filters filters={filters} setFilters={setFilters} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
