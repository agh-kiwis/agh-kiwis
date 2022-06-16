import { NavBar } from '../components/Login/NavBar';
import { Wrapper } from '../components/Containers/Wrapper';
import {TodoList} from './TodoList';
import { Task } from '../components/TodoList/Task';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <>
      <Wrapper>
        <TodoList />
      </Wrapper>
    </>
  );
}

export default Index;
