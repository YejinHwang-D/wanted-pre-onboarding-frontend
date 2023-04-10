import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthStateContext } from '../context/authContext';

function TodoList() {
  const navigate = useNavigate();
  const user = useContext(AuthStateContext);

  useEffect(() => {
    if (!user) {
      alert('Todo List를 작성하시려면 로그인해주세요.');
      navigate('/signin');
    }
  });

  return <section>Todo List</section>;
}

export default TodoList;
