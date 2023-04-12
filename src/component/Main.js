import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import TodoExample from './todo/TodoExample';

function Main() {
  function exampleSubmit(e) {
    e.preventDefault();
    alert('로그인 후 Todo 페이지에서 이용하실 수 있어요. :)');
  }
  return (
    <Section>
      <Div>
        <Title>PRE-ONBOARDING</Title>
        <Title>FRONTEND INTERNSHIP</Title>
      </Div>
      <Div>
        <Todo>
          <TodoTitle>Todo List</TodoTitle>
          <Form onSubmit={exampleSubmit}>
            <Input
              data-testid="new-todo-input"
              placeholder="input your new Todo"
            />
            <Button data-testid="new-todo-add-button">
              추가
              <FontAwesomeIcon icon={faPen} color="#7C83FD" />
            </Button>
          </Form>
          <List>
            <TodoExample text="로그인하시면 Todo 리스트를 이용하실 수 있어요!" />
            <TodoExample text="아직 회원이 아니라면 회원가입을 해주세요. :)" />
            <TodoExample text="오늘 할 일을 입력하고," />
            <TodoExample text="완료 여부를 저장해보세요." />
          </List>
        </Todo>
      </Div>
    </Section>
  );
}

const Section = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 70%;
  margin: 1.5em 0;
  border: 1em solid white;
  box-shadow: rgba(247, 247, 251, 0.2) 0px 8px 24px;
`;
const Title = styled.p`
  display: flex;
  font-size: 2em;
  margin: 0.5em 0 0.5em 0;
  font-weight: bold;
  font-style: italic;
  background: linear-gradient(
    90deg,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Todo = styled(Div)`
  margin: 0;
`;
const TodoTitle = styled.p`
  font-size: 1.1em;
  font-weight: bold;
  color: #7c83fd;
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

export default Main;
