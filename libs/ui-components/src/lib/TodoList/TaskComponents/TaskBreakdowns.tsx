import { TaskBreakdown } from '@agh-kiwis/data-access';
import { Chunk } from '../BreakdownComponents/Breakdown';

type BreakdownsProps = {
  breakdowns: TaskBreakdown[];
};

export const Chunks: React.FC<BreakdownsProps> = ({ breakdowns }) => {
  return (
    <>
      {breakdowns.map((breakdown, key) => (
        <Chunk key={key} index={key} breakdown={breakdown} />
      ))}
    </>
  );
};
