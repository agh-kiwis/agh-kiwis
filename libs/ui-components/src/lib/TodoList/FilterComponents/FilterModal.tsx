import { Dispatch, SetStateAction } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Filters } from './Filters';
import { FilterInterface } from './filterConstants';
import { MappedFilter, mapToGraphQLFields } from './filterLogic';

type FilterModalProps = {
  isOpen: boolean;
  close: () => void;
  filters: FilterInterface[];
  setFilters: Dispatch<SetStateAction<FilterInterface[]>>;
  mappedFilter: MappedFilter;
  setMappedFilter: Dispatch<SetStateAction<MappedFilter>>;
};

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  close,
  filters,
  setFilters,
  mappedFilter,
  setMappedFilter,
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

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={close}>
            Close
          </Button>
          <Button
            onClick={() => {
              setMappedFilter(mapToGraphQLFields(mappedFilter, filters));
              close();
            }}
          >
            Apply Filters
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
