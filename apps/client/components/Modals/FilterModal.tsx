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
  } from '@chakra-ui/react'

export const FilterModal = (props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.close}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Filter options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <FilterOptions />
        </ModalBody>

        <ModalFooter>
            <Button variant='ghost' mr={3} onClick={props.close}>
            Close
            </Button>
            <Button colorScheme='blue'>Add filters</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
    )
}