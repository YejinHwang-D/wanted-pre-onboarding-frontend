import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

const Li = styled.li`
  list-style: none;
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
      <label>
        <input type="checkbox" onChange={isCompletedHandler} ref={checked} />
        {isUpdatemode ? (
          <div>
            <input
              data-testid="modify-input"
              value={inputs.todo}
              name="todo"
              onChange={changeHandler}
            />
            <button data-testid="submit-button" onClick={isUpdateHandler}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={isUpdatemodeHandler}>
              취소
            </button>
          </div>
        ) : (
          <div>
            <span>{inputs.todo}</span>
            <button onClick={isUpdatemodeHandler}>수정</button>
            <button onClick={deleteHandler}>삭제</button>
          </div>
        )}
      </label>
    </Li>
  );
}

export default TodoElement;
