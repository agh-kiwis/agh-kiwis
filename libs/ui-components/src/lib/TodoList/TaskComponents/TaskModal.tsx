import { Box, Button, HStack, Text } from '@chakra-ui/react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Task } from '@agh-kiwis/data-access';
import { deadlineToDate } from '@agh-kiwis/moment-service';
import { TaskBreakdowns } from './TaskBreakdowns';

type TaskModalProps = {
  isOpen: boolean;
  task: Task;
  close: () => void;
};

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  task,
  close,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader>
          <Text fontSize="xl" mr="1rem">
            {task.name}
          </Text>
          <Text fontSize="sm"> Priority: {task.priority.name}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {task.isFloat ? (
            <Box>
              <Text> Deadline: {deadlineToDate(task.deadline!)}</Text>
              <TaskBreakdowns breakdowns={task.taskBreakdowns!} />
            </Box>
          ) : null}
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button variant="outline" mr="2">
              Edit task
            </Button>
            <Button> Mark task as done </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
