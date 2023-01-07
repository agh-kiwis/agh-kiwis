import { useState } from 'react';
import { Checkbox } from '@chakra-ui/react';
import {
  Chunk,
  ChunkInput,
  useUpdateChunkMutation,
} from '@agh-kiwis/data-access';
import { ChunkContainer } from './ChunkContainer';
import { ChunkInfo } from './ChunkInfo';

type TaskChunkProps = {
  index: number;
  chunk: Chunk;
  color: string;
};

export const TaskChunk: React.FC<TaskChunkProps> = ({
  index,
  chunk,
  color,
}) => {
  const [checked, setChecked] = useState(chunk.isDone);

  const [updateChunkMutation, { loading }] = useUpdateChunkMutation({
    variables: {
      id: chunk?.id,
      chunkInput: chunkToMarkAsDoneMutationMapper(chunk),
    },
  });

  const handleMarkingAsDone = async () => {
    const response = await updateChunkMutation().catch((error) => {
      console.log(error);
    });

    if (response) {
      setChecked(!!response?.data?.updateChunk?.isDone);
    }
  };

  return (
    <ChunkContainer checked={checked} color={color}>
      <ChunkInfo checked={checked} id={index} chunk={chunk} />
      <Checkbox
        px="4"
        isChecked={checked}
        onChange={() => handleMarkingAsDone()}
      />
    </ChunkContainer>
  );
};

export const chunkToMarkAsDoneMutationMapper = (chunk: Chunk): ChunkInput => ({
  start: chunk.start,
  duration: chunk.duration,
  isDone: !chunk.isDone,
});
