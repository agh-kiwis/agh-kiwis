import { Box, Button, HStack, Text } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Chunks } from './TaskBreakdowns';

export const TaskModal = (props) => {
  const task = props.task;
  return (
    <Modal isOpen={props.isOpen} onClose={props.close} isCentered>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>
          <Text fontSize={'xl'} mr="1rem">
            {task.name}
          </Text>
          <Text fontSize={'sm'}> Priority: {task.priority.name}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {task.isFloat ? (
            <Box>
              <Text> Deadline: {props.deadline}</Text>
              <Chunks breakdowns={task.taskBreakdowns} />
            </Box>
          ) : null}
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button variant="outline" mr={2}>
              Edit task
            </Button>
            <Button> Mark task as done </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
