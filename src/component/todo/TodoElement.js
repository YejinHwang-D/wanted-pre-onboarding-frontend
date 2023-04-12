import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoElement({ data, getData }) {
  const token = localStorage.getItem('JWT');
  const checked = useRef();

  const [isUpdatemode, setIsUpdatemode] = useState(false);
  function isUpdatemodeHandler() {
    setInputs({ ...inputs, todo: data.todo });
    setIsUpdatemode(!isUpdatemode);
  }

  const [inputs, setInputs] = useState({
    isCompleted: data.isCompleted,
    todo: data.todo,
  });

  useEffect(() => {
    if (inputs.isCompleted) {
      checked.current.checked = true;
    } else {
      checked.current.checked = false;
    }
  }, [inputs]);

  function changeHandler(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  async function updateHandler(enteredData) {
    try {
      const res = await axios({
        url: `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: enteredData,
      });
    } catch (error) {
      alert('[ERROR] 정상적으로 업데이트되지 않았습니다.');
    }
  }

  async function deleteHandler() {
    try {
      const res = await axios({
        url: `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 204) {
        getData();
      }
    } catch (error) {
      alert('[ERROR] 정상적으로 삭제되지 않았습니다.');
    }
  }

  async function isCompletedHandler() {
    const enteredData = {
      isCompleted: !inputs.isCompleted,
      todo: inputs.todo,
    };
    updateHandler(enteredData);
    setInputs({ ...inputs, isCompleted: !inputs.isCompleted });
  }

  async function isUpdateHandler() {
    updateHandler(inputs);
    setIsUpdatemode(!isUpdatemode);
  }

  return (
    <Li>
      <Label>
        <label>
          <Checkbox
            type="checkbox"
            onChange={isCompletedHandler}
            ref={checked}
          />
        </label>
        {isUpdatemode ? (
          <div>
            <input
              data-testid="modify-input"
              value={inputs.todo}
              name="todo"
              onChange={changeHandler}
            />
            <Button data-testid="submit-button" onClick={isUpdateHandler}>
              제출
            </Button>
            <Button data-testid="cancel-button" onClick={isUpdatemodeHandler}>
              취소
            </Button>
          </div>
        ) : (
          <div>
            <Span>{inputs.todo}</Span>
            <Button onClick={isUpdatemodeHandler}>
              <FontAwesomeIcon icon={faPen} color="#bababa" />
            </Button>
            <Button onClick={deleteHandler}>
              <FontAwesomeIcon icon={faTrash} color="#bababa" />
            </Button>
          </div>
        )}
      </Label>
    </Li>
  );
}

const Li = styled.li`
  list-style: none;
`;
const Label = styled.label`
  display: flex;
  margin: 1em;
  align-items: center;
`;
const Button = styled.button`
  border: 5px solid white;
  background: white;
  color: #bababa;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.4s;

  &:hover {
    transform: scale(1.2);
  }
`;
const Span = styled.span`
  color: #7c83fd;
  margin: 0 1em 0 1em;
`;
const Checkbox = styled.input`
  appearance: none;
  width: 1.1em;
  height: 1.1em;
  border: 1px solid #7c83fd;
  border-radius: 3px;
  &:checked {
    background-color: #7c83fd;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  }
`;

export default TodoElement;
