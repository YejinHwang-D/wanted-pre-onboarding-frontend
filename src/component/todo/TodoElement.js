import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Li = styled.li`
  list-style: none;
`;

function TodoElement({ data, getData }) {
  const token = localStorage.getItem('JWT');

  const [isUpdate, setIsUpdate] = useState(false);
  const [inputs, setInputs] = useState({
    isCompleted: false,
    todo: data.todo,
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  async function updateHandler() {
    const res = await axios({
      url: `https://www.pre-onboarding-selection-task.shop/todos/${data.id}`,
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: inputs,
    });
    if (res.status !== 200) {
      throw new Error('[ERROR] 정상적으로 업데이트되지 않았습니다.');
    } else {
      setIsUpdate(!isUpdate);
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

  function isUpdateHandler() {
    setInputs({ ...inputs, todo: data.todo });
    setIsUpdate(!isUpdate);
  }

  async function isCompletedHandler() {
    setInputs({ ...inputs, isCompleted: !inputs.isCompleted });
    updateHandler();
  }

  return (
    <Li>
      <label>
        {data.isCompleted ? (
          <input type="checkbox" checked onClick={isCompletedHandler} />
        ) : (
          <input type="checkbox" onClick={isCompletedHandler} />
        )}
        {isUpdate ? (
          <div>
            <input
              data-testid="modify-input"
              value={inputs.todo}
              name="todo"
              onChange={changeHandler}
            />
            <button data-testid="submit-button" onClick={updateHandler}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={isUpdateHandler}>
              취소
            </button>
          </div>
        ) : (
          <div>
            <span>{inputs.todo}</span>
            <button onClick={isUpdateHandler}>수정</button>
            <button onClick={deleteHandler}>삭제</button>
          </div>
        )}
      </label>
    </Li>
  );
}

export default TodoElement;
