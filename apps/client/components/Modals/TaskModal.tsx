import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Chunks } from '../TodoList/Chunks';

export const TaskModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.close} isCentered>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>
          <Text fontSize={'xl'} marginRight="1rem">
            {props.task.name}
          </Text>
          <Text fontSize={'sm'}>Priority: {props.task.priority.name}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!props.task.isFloat ? null : (
            <Box>
              <Text>Deadline: {props.deadline}</Text>
              <Chunks
                timeConvert={props.timeConvert}
                timeInterval={props.timeInterval}
                chunks={props.task.taskBreakdowns}
              />
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button variant="outline" mr={2}>
              Edit task
            </Button>
            <Button>Mark task as done</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
