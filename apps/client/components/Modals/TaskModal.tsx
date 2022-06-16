import { Button } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HiChevronDoubleUp } from "react-icons/hi";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

export const TaskModal = (props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.close}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>
        Go for a walk 
        <Icon as={HiChevronDoubleUp}
                fontSize="2xl"
        />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Text>Deadline: 13 Aug</Text>
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