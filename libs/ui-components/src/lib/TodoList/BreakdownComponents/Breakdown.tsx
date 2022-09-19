import { Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import { ChunkContainer } from './BreakdownContainer';
import { ChunkInfo } from './BreakdownInfo';
import { TaskBreakdown } from '@agh-kiwis/data-access';

type ChunkProps = {
  index: number;
  breakdown: TaskBreakdown;
};

export const Chunk: React.FC<ChunkProps> = ({ index, breakdown }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = async () => {
    setChecked(!checked);
  };

  return (
    <ChunkContainer checked={checked}>
      <Checkbox ml="1rem" checked={checked} onChange={() => handleChange()} />
      <ChunkInfo checked={checked} id={index} breakdown={breakdown} />
    </ChunkContainer>
  );
};
