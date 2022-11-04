import { TaskBreakdown } from '@agh-kiwis/data-access';
import { ScrollStack } from '../../Common/ScrollStack';
import { Breakdown } from '../BreakdownComponents/Breakdown';

type TaskBreakdownsProps = {
  breakdowns: TaskBreakdown[];
};

export const TaskBreakdowns: React.FC<TaskBreakdownsProps> = ({
  breakdowns,
}) => {
  return (
    <ScrollStack height="34vh">
      {breakdowns?.map((breakdown, key) => (
        <Breakdown key={key} index={key} breakdown={breakdown} />
      ))}
    </ScrollStack>
  );
};
