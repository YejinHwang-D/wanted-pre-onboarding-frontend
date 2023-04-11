import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const Li = styled.li`
  list-style: none;
`;
const Label = styled.label`
  display: flex;
  margin: 1em;
`;
const Button = styled.button`
  border: 5px solid white;
  background: white;
  color: #bababa;
  border-radius: 5px;
`;
const Span = styled.span`
  color: #7c83fd;
  margin: 0 1em 0 1em;
`;

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
    const res = await axios({
      url: `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: enteredData,
    });
    if (res.status !== 200) {
      throw new Error('[ERROR] 정상적으로 업데이트되지 않았습니다.');
    }
  }

  async function deleteHandler() {
    const res = await axios({
      url: `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 204) {
      throw new Error('[ERROR] 정상적으로 삭제되지 않았습니다.');
    }
    getData();
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
          <input type="checkbox" onChange={isCompletedHandler} ref={checked} />
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

export default TodoElement;
