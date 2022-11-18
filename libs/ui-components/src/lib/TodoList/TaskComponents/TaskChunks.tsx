import { Chunk } from '@agh-kiwis/data-access';
import { ScrollStack } from '../../Common/ScrollStack';
import { TaskChunk } from '../ChunkComponents/TaskChunk';

type TaskChunksProps = {
  chunks: Chunk[];
};

export const TaskChunks: React.FC<TaskChunksProps> = ({ chunks }) => {
  return (
    <ScrollStack height="34vh">
      {chunks?.map((chunk, key) => (
        <TaskChunk key={key} index={key} chunk={chunk} />
      ))}
    </ScrollStack>
  );
};
