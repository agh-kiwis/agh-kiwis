import { Chunk, Color } from '@agh-kiwis/data-access';
import { ScrollStack } from '../../Common/ScrollStack';
import { TaskChunk } from '../ChunkComponents/TaskChunk';

type TaskChunksProps = {
  chunks: Chunk[];
  color: string;
};

export const TaskChunks: React.FC<TaskChunksProps> = ({ chunks, color }) => {
  return (
    <ScrollStack height="34vh">
      {chunks?.map((chunk, key) => (
        <TaskChunk key={key} index={key} chunk={chunk} color={color} />
      ))}
    </ScrollStack>
  );
};
