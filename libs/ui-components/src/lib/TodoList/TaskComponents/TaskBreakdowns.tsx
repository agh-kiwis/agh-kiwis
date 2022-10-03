import { TaskBreakdown } from '@agh-kiwis/data-access';
import { Breakdown } from '../BreakdownComponents/Breakdown';
import { ScrollStack } from '../../Common/ScrollStack';

type TaskBreakdownsProps = {
  breakdowns: TaskBreakdown[];
};

export const TaskBreakdowns: React.FC<TaskBreakdownsProps> = ({
  breakdowns,
}) => {
  return (
    <ScrollStack height='30vh' marginBot='0.6rem'>
      {breakdowns.map((breakdown, key) => (
        <Breakdown key={key} index={key} breakdown={breakdown} />
      ))}
    </ScrollStack>
  );
};
