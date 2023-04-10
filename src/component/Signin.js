import { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import useAuth from '../context/useAuth';
import { AuthStateContext } from '../context/authContext';

const Section = styled.main`
  display: flex;
  justify-content: center;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 20em;
  margin-top: 5em;
  border-radius: 10px;
  background-color: #f7f7f7;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

function Signin() {
  const navigate = useNavigate();
  const user = useContext(AuthStateContext);
  useEffect(() => {
    if (user) {
      navigate('/todo');
    }
  });

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const signinBtn = useRef();

  useEffect(() => {
    if (inputs.email.includes('@') && inputs.password.length >= 8) {
      signinBtn.current.disabled = false;
    } else {
      signinBtn.current.disabled = true;
    }
  }, [inputs]);

  function changeHandler(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  const { signIn } = useAuth();
  async function submitHandler(e) {
    e.preventDefault();
    const res = await axios({
      url: 'https://www.pre-onboarding-selection-task.shop/auth/signin',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: inputs.email,
        password: inputs.password,
      },
    });

    const token = res.data.access_token;
    signIn(token);
    if (res.status === 200) {
      alert('로그인되었습니다. \nTodo List로 이동합니다.');
      navigate('/todo');
    }
    navigate('/todo');
  }

  return (
    <Section>
      <Div>
        <p>로그인</p>
        <Form onSubmit={submitHandler}>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={inputs.email}
            onChange={changeHandler}
            placeholder="이메일을 입력해주세요."
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={inputs.password}
            onChange={changeHandler}
            placeholder="비밀번호를 입력해주세요. (8자 이상)"
          />
          <button
            data-testid="signin-button"
            type="submit"
            ref={signinBtn}
            disabled
          >
            로그인
          </button>
        </Form>
      </Div>
    </Section>
  );
}

export default Signin;
