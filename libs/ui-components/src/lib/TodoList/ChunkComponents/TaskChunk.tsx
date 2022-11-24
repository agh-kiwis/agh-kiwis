import { useState } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { Chunk } from '@agh-kiwis/data-access';
import { ChunkContainer } from './ChunkContainer';
import { ChunkInfo } from './ChunkInfo';

type TaskChunkProps = {
  index: number;
  chunk: Chunk;
};

export const TaskChunk: React.FC<TaskChunkProps> = ({ index, chunk }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = async () => {
    setChecked(!checked);
  };

  return (
    <ChunkContainer checked={checked}>
      <ChunkInfo checked={checked} id={index} chunk={chunk} />
      <Checkbox px="4" checked={checked} onChange={() => handleChange()} />
    </ChunkContainer>
  );
};
