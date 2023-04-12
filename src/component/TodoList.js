import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import TodoElement from './todo/TodoElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

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
        <P>Todo List</P>
        <Form onSubmit={submitHandler}>
          <Input
            data-testid="new-todo-input"
            placeholder="input your new Todo"
            value={input}
            onChange={changeHandler}
          />
          <Button data-testid="new-todo-add-button">
            추가
            <FontAwesomeIcon icon={faPen} color="#7C83FD" />
          </Button>
        </Form>
        <List>
          {todoList &&
            todoList.map((element) => (
              <TodoElement key={element.id} data={element} getData={getData} />
            ))}
        </List>
      </Div>
    </Section>
  );
}

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
  border: 3em solid white;
  background-color: white;
  box-shadow: rgba(247, 247, 251, 0.2) 0px 8px 24px;
  @media screen and (max-width: 800px) {
    width: 65%;
  }
`;
const P = styled.p`
  color: #7c83fd;
  font-size: 1.2em;
  font-weight: bold;
`;
const Form = styled.form`
  display: flex;
`;
const Input = styled.input`
  border: 1px solid #f7f7f7;
  border-radius: 5px;
  padding: 1em;
  margin-right: 0.5em;
  background-color: #f7f7fb;
  width: 20vw;
  &::placeholder {
    color: #bababa;
  }
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 800px) {
    width: 30vw;
  }
`;
const Button = styled.button`
  border: none;
  background: inherit;
  color: #7c83fd;
  width: 5em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: transform 0.4s;

  &:hover {
    transform: scale(1.1);
  }
`;
const List = styled.ul`
  margin-top: 2em;
  padding: 0;
  width: 70%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export default TodoList;
