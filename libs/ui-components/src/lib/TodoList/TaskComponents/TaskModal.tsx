import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
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
import {
  Task,
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} from '@agh-kiwis/data-access';
import {
  deadlineToDate,
  startToDate,
  startToTime,
} from '@agh-kiwis/moment-service';
import { CommonButton } from '@agh-kiwis/ui-components';
import { DESCRIPTIVE_DATE_FORMAT } from '@agh-kiwis/workspace-constants';
import { Header } from '../../Common/Header';
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
  const router = useRouter();
  const [isDeleteMode, setDeleteMode] = useState(false);

  const [removeTaskMutation] = useRemoveTaskMutation({
    variables: {
      id: task.id,
    },
  });

  const [updateTaskMutation, { loading }] = useUpdateTaskMutation({
    variables: {
      taskInput: {
        id: task.id,
        isDone: !task.isDone,
        priority: task.priority,
      },
    },
  });

  const handleDelete = async () => {
    const response = await removeTaskMutation().catch((error) => {
      console.log(error);
    });

    if (response) {
      router.push('/');
    }
  };

  const handleMarkingAsDone = async () => {
    const response = await updateTaskMutation().catch((error) => {
      console.log(error);
    });

    if (response) {
      close();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent mx="4">
        {isDeleteMode ? (
          <>
            <ModalHeader>
              <Box mt="8">
                <Header text={'do You want to delete this task?'} size="md" />
              </Box>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            <ModalFooter>
              <VStack align="stretch" w="100%">
                <HStack>
                  <CommonButton
                    variant="outline"
                    buttonText="No, cancel"
                    onClick={() => setDeleteMode(false)}
                  />
                  <CommonButton
                    variant="solid"
                    type="submit"
                    buttonText="Yes, delete"
                    onClick={handleDelete}
                  />
                </HStack>
              </VStack>
            </ModalFooter>
          </>
        ) : (
          <>
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
                      <Td>{task.priority}</Td>
                    </Tr>
                    {task.isFloat && (
                      <Tr>
                        <Td>Deadline:</Td>
                        <Td>
                          {deadlineToDate(
                            task.deadline!,
                            DESCRIPTIVE_DATE_FORMAT
                          )}
                        </Td>
                      </Tr>
                    )}
                    {!task.isFloat && (
                      <>
                        <Tr>
                          <Td>Date:</Td>
                          <Td>
                            {startToDate(
                              task.taskBreakdowns &&
                                task.taskBreakdowns[0].start,
                              DESCRIPTIVE_DATE_FORMAT
                            )}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Time:</Td>
                          <Td>
                            {startToTime(
                              task.taskBreakdowns &&
                                task.taskBreakdowns[0].start
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
              <VStack align="stretch" w="100%">
                <HStack>
                  <CommonButton
                    isLoading={loading}
                    onClick={handleMarkingAsDone}
                    buttonText={
                      task.isDone ? 'Mark task as undone' : 'Mark task as done'
                    }
                  />
                </HStack>
                <HStack>
                  <CommonButton
                    variant="outline"
                    colorScheme="red"
                    buttonText="Delete task"
                    onClick={() => setDeleteMode(true)}
                  />
                  <CommonButton
                    variant="outline"
                    buttonText="Edit task"
                    onClick={() => router.push(`/edit/${task.id}`)}
                  />
                </HStack>
              </VStack>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
