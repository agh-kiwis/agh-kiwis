import {
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
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
  console.log('file: TaskModal.tsx -> line 26 -> task', task);
  return (
    <Modal isOpen={isOpen} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>
          <TableContainer fontSize="md">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Category:</Th>
                  <Th>{task.category.name}</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Name:</Td>
                  <Td>{task.name}</Td>
                </Tr>
                <Tr>
                  <Td>Priority:</Td>
                  <Td>{task.priority.name}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {task.isFloat && (
            <Box>
              <Text> Deadline: {deadlineToDate(task.deadline!)}</Text>
              <TaskBreakdowns breakdowns={task.taskBreakdowns!} />
            </Box>
          )}
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
