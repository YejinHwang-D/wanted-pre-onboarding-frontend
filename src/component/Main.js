import styled from 'styled-components';

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
  margin-top: 3em;
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
const P = styled.p`
  color: #595959;
`;

function Main() {
  return (
    <Section>
      <Div>
        <Title>PRE-ONBOARDING</Title>
        <Title>FRONTEND INTERNSHIP</Title>
      </Div>
      <Div>
        <P>처음 방문하셨다면 회원가입을 먼저 진행해주세요.</P>
        <P>
          로그인하셨다면 Todo 리스트를 작성할 수 있는 페이지로 이동합니다. :)
        </P>
      </Div>
    </Section>
  );
}

export default Main;
