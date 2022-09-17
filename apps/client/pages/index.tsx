import { Wrapper } from '../components/Containers/Wrapper';
import { TodoList } from './todolist/todo-list';

export function Index() {
  return (
    <Wrapper>
      <TodoList />
    </Wrapper>
  );
}

export default Index;
