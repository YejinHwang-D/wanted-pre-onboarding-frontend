import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import TodoElement from './todo/TodoElement';

const Section = styled.main`
  display: flex;
  justify-content: center;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  min-height: 20em;
  margin-top: 5em;
  border: 3em solid #f7f7f7;
  border-radius: 10px;
  background-color: #f7f7f7;
`;
const Form = styled.form`
  display: flex;
`;

function TodoList() {
  const token = localStorage.getItem('JWT');
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState(null);

  const getData = useCallback(async () => {
    const res = await axios({
      url: 'https://www.pre-onboarding-selection-task.shop/todos',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodoList(res.data);
  });

  useEffect(() => {
    if (!localStorage.getItem('JWT')) {
      alert('Todo List를 작성하시려면 로그인해주세요.');
      navigate('/signin');
    }
    getData();
  }, [navigate]);

  function changeHandler(e) {
    setInput(e.target.value);
  }

  async function submitHandler(e) {
    e.preventDefault();
    const res = await axios({
      url: 'https://www.pre-onboarding-selection-task.shop/todos',
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        todo: input,
      },
    });

    if (res.status !== 201) {
      throw new Error('[ERROR] 할 일이 정상적으로 등록되지 않았습니다.');
    } else {
      setTodoList([...todoList, res.data]);
    }
  }

  return (
    <Section>
      <Div>
        <p>Todo List</p>
        <Form onSubmit={submitHandler}>
          <input
            data-testid="new-todo-input"
            placeholder="input your new Todo"
            value={input}
            onChange={changeHandler}
          />
          <button data-testid="new-todo-add-button">추가</button>
        </Form>
        {todoList &&
          todoList.map((element) => (
            <TodoElement key={element.id} data={element} getData={getData} />
          ))}
      </Div>
    </Section>
  );
}

export default TodoList;
