import {
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
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
import { Task, useUpdateTaskMutation } from '@agh-kiwis/data-access';
import {
  deadlineToDate,
  startToDate,
  startToTime,
} from '@agh-kiwis/moment-service';
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
  const [updateTaskMutation] = useUpdateTaskMutation({
    variables: {
      taskInput: {
        id: task.id,
        isDone: !task.isDone,
      },
    },
  });

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
                {task.isFloat && (
                  <Tr>
                    <Td>Deadline:</Td>
                    <Td>{deadlineToDate(task.deadline!, 'DD MMM YYYY')}</Td>
                  </Tr>
                )}
                {!task.isFloat && (
                  <>
                    <Tr>
                      <Td>Date:</Td>
                      <Td>
                        {startToDate(
                          task.taskBreakdowns && task.taskBreakdowns[0].start,
                          'DD MMM YYYY'
                        )}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Time:</Td>
                      <Td>
                        {startToTime(
                          task.taskBreakdowns && task.taskBreakdowns[0].start
                        )}
                      </Td>
                    </Tr>
                  </>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {task.isFloat && (
            <Box>
              <TaskBreakdowns breakdowns={task.taskBreakdowns!} />
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button variant="outline" mr="2">
              Edit task
            </Button>
            <Button onClick={() => updateTaskMutation()}>
              {task.isDone ? 'Mark task as undone' : 'Mark task as done'}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
