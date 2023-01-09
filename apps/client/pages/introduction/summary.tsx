import { TasksQuery, useTasksQuery } from '@agh-kiwis/data-access';
import {
  CommonButton,
  CustomSpinner,
  Logo,
  Wrapper
} from '@agh-kiwis/ui-components';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const IntroductionSummary: React.FC = () => {
  const { data, loading } = useTasksQuery();

  const renderSummaryTable = (data: TasksQuery) => {
    const categoriesMap = new Map<string, number>([]);

    data?.tasks.map((task) => {
      categoriesMap.has(task.category.name)
        ? categoriesMap.set(
            task.category.name,
            categoriesMap.get(task.category.name) + 1
          )
        : categoriesMap.set(task.category.name, 1);
    });

    return [...categoriesMap.entries()].map(
      ([categoryName, numberOfTasks], index) => {
        return (
          <Tr key={index}>
            <Td>{categoryName}</Td>
            <Td isNumeric>{numberOfTasks}</Td>
          </Tr>
        );
      }
    );
  };

  const router = useRouter();

  if (loading) {
    return <CustomSpinner />;
  }
  return (
    <Wrapper>
      <Logo textVisible={false} />
      <Text fontSize="2xl" textAlign="center">
        Great! You have added daily routine tasks to these categories:
      </Text>
      <TableContainer fontSize="lg" my="8">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Category name</Th>
              <Th isNumeric>Number of tasks</Th>
            </Tr>
          </Thead>
          <Tbody>{renderSummaryTable(data)}</Tbody>
        </Table>
      </TableContainer>

      <VStack mt="4" spacing="4">
        <CommonButton
          variant="solid"
          buttonText="Finish"
          onClick={() => router.push('/')}
        />
        <CommonButton
          variant="outline"
          buttonText="Add custom tasks"
          onClick={() => router.push('/add/const-task')}
        />
      </VStack>
    </Wrapper>
  );
};

export default IntroductionSummary;
