import { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AuthStateContext } from '../context/authContext';

const Section = styled.main`
  display: flex;
  justify-content: center;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  min-height: 15em;
  margin-top: 5em;
  border: 3em solid white;
  background-color: white;
  background-color: white;
  box-shadow: rgba(247, 247, 251, 0.2) 0px 8px 24px;
`;
const P = styled.p`
  color: #7c83fd;
  font-size: 1.2em;
  font-weight: 400;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  border: 1px solid #f7f7f7;
  border-radius: 5px;
  padding: 1em;
  margin: 0.5em 0;
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
  border-radius: 5px;
  margin-top: 0.5em;
  width: 10em;
  height: 3em;
  box-shadow: rgba(247, 247, 251, 0.2) 0px 8px 24px;
  cursor: pointer;
  background-color: #96baff;
  color: #f7f7fb;

  &:hover {
    background-color: #fff2f2;
    color: #96baff;
  }

  &:disabled {
    background-color: #bababa;
    cursor: auto;
    &:hover {
      background: #bababa;
      color: white;
    }
  }
`;

function Signup() {
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
        <P>회원가입</P>
        <Form onSubmit={submitHandler}>
          <Input
            data-testid="email-input"
            type="email"
            name="email"
            value={inputs.email}
            onChange={changeHandler}
            placeholder="이메일을 입력해주세요."
          />
          <Input
            data-testid="password-input"
            type="password"
            name="password"
            value={inputs.password}
            onChange={changeHandler}
            placeholder="비밀번호를 입력해주세요. (8자 이상)"
          />
          <Button
            data-testid="signin-button"
            type="submit"
            ref={signinBtn}
            disabled
          >
            회원가입
          </Button>
        </Form>
      </Div>
    </Section>
  );
}

export default Signup;
