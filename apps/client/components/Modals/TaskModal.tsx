import moment from "moment";
import { Box, Button, Text } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Chunks } from '../TodoList/Chunks';

function dataConvert(miliseconds: number) {
    return moment(miliseconds, "x").format("DD MMM");
}

const chunkNumber = 5;

export const TaskModal = (props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.close}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text fontSize={"xl"} marginRight='1rem'>{props.task.name}</Text>
                    <Text fontSize={"sm"}>Priority: {props.task.priority.name}</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {!props.task.isFloat ? null :
                        <Box>
                            <Text>Deadline: {dataConvert(props.task.deadline)}</Text>
                            <Chunks chunkNumber={chunkNumber} />
                        </Box>
                    }
                </ModalBody>

                <ModalFooter>
                    <Button width='100%' variant='ghost'>Edit task</Button>
                    <Button width='100%' colorScheme='blue'>Mark task as done</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}