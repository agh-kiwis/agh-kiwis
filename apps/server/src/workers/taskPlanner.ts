import { createQueryBuilder } from 'typeorm';
import { ChunkInfo } from '../tasks/entities/chunkInfo.entity';
import { Task } from '../tasks/entities/task.entity';
import { TaskBreakdown } from '../tasks/entities/taskBreakdown.entity';

export const planTask = async (task: Task, chunkInfo: ChunkInfo) => {
  if (!task || !task.isFloat) {
    throw new Error('Error while planning task');
  }

  console.log(`Planning task: ${task.name}`);

  //   Remove all previous task breakdowns
  await TaskBreakdown.delete({ task: task });

  //   So we just go from start date and if we can fit task over there, than fit, else just jump over that task + gap between tasks, and repeat again.

  // Get tasks from start to deadline date
  const tasksInBetween = await createQueryBuilder('TaskBreakdown')
    .leftJoin('TaskBreakdown.task', 'task')
    .where(
      'TaskBreakdown.start >= :start and TaskBreakdown.start <= :deadline',
      {
        start: chunkInfo.start,
        deadline: task.deadline,
      }
    )
    //   User should be given user
    .andWhere('task.user = :user_id', { user_id: task.user.id })
    .getMany();

  console.log('results');
  console.log(tasksInBetween);
};
