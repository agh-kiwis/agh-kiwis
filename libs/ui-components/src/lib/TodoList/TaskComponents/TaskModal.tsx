import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
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
  TaskInput,
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} from '@agh-kiwis/data-access';
import {
  deadlineToDate,
  getIntervalISOString,
  momentToDate,
  startToTime,
} from '@agh-kiwis/moment-service';
import { CommonButton, CustomSpinner } from '@agh-kiwis/ui-components';
import { DESCRIPTIVE_DATE_FORMAT } from '@agh-kiwis/workspace-constants';
import { Header } from '../../Common/Header';
import { TaskChunks } from './TaskChunks';

type TaskModalProps = {
  isOpen: boolean;
  task: Task;
  color: string;
  close: () => void;
};

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  task,
  color,
  close,
}) => {
  const router = useRouter();
  const [isDeleteMode, setDeleteMode] = useState(false);

  const [removeTaskMutation] = useRemoveTaskMutation({
    variables: {
      id: task?.id,
    },
  });

  const [updateTaskMutation, { loading }] = useUpdateTaskMutation({
    variables: {
      id: task?.id,
      taskInput: taskToMarkAsDoneMutationMapper(task),
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

  const getDurationHumanized = (task: Task) => {
    if (!task.chunkInfo) {
      throw new Error('Task chunk info is not defined');
    }

    if (!task.chunkInfo.repeat) {
      throw new Error('Task chunk info repeat is not defined');
    }

    const withAArticle = moment
      .duration(
        task.chunkInfo.repeat.repeatEvery,
        // Convert this to lowercase
        task.chunkInfo.repeat.repeatType.toLowerCase() as moment.unitOfTime.DurationConstructor
      )
      .humanize({ d: 7, w: 4 });

    return withAArticle.replace('a ', '');
  };

  const convertDateOfTask = useCallback((task: Task) => {
    if (!task.chunkInfo) {
      throw new Error('Task chunk info is not defined');
    }

    if (!task.isFloat && task.chunkInfo?.repeat) {
      if (task.chunkInfo.repeat.repeatType === 'Days') {
        return `Every ${getDurationHumanized(task)}`;
      } else {
        // Determine day of week when task.chunkInfo.start is
        const dayOfWeek = momentToDate(task.chunkInfo.start, 'dddd');

        return `On ${dayOfWeek} every ${getDurationHumanized(task)}`;
      }
    }

    return momentToDate(task.chunkInfo.start, DESCRIPTIVE_DATE_FORMAT);
  }, []);

  if (!task) {
    return (
      <Modal isOpen={isOpen} onClose={close} isCentered>
        <ModalOverlay />
        <ModalContent mx="4">
          <ModalHeader>Task details</ModalHeader>
          <ModalCloseButton />
          <CustomSpinner />;
        </ModalContent>
      </Modal>
    );
  }
  return (
    <Modal isOpen={isOpen} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>Task details</ModalHeader>
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
                    {task.isFloat && task?.chunkInfo?.deadline && (
                      <Tr>
                        <Td>Deadline:</Td>
                        <Td>
                          {deadlineToDate(
                            task.chunkInfo.deadline,
                            DESCRIPTIVE_DATE_FORMAT
                          )}
                        </Td>
                      </Tr>
                    )}
                    {!task.isFloat && task?.chunkInfo && (
                      <>
                        <Tr>
                          {task?.chunkInfo?.repeat ? (
                            <Td>Repeat:</Td>
                          ) : (
                            <Td>Date:</Td>
                          )}
                          <Td>{convertDateOfTask(task)}</Td>
                        </Tr>
                        <Tr>
                          <Td>Time:</Td>
                          <Td>{startToTime(task.chunkInfo.start)}</Td>
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
                  <TaskChunks chunks={task.chunks!} color={color} />
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

export const taskToMarkAsDoneMutationMapper = (task: Task): TaskInput => ({
  category: {
    id: task?.category.id,
  },
  name: task?.name,
  priority: task?.priority,
  chillTime: getIntervalISOString(task?.chunkInfo?.chillTime),
  start: task?.chunkInfo?.start,
  shouldAutoResolve: task?.shouldAutoResolve,
  isDone: !task?.isDone,
});
