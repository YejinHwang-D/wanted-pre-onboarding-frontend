import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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

function Signup() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const signinBtn = useRef();
  const navigate = useNavigate();

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

  async function submitHandler(e) {
    e.preventDefault();
    const res = await axios({
      url: 'https://www.pre-onboarding-selection-task.shop/auth/signup',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: inputs.email,
        password: inputs.password,
      },
    });
    console.log(res);
    if (res.status === 201) {
      alert('회원가입이 완료되었습니다.');
      navigate('/signin');
    }
  }

  return (
    <Section>
      <Div>
        <p>회원가입</p>
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
            회원가입
          </button>
        </Form>
      </Div>
    </Section>
  );
}

export default Signup;
