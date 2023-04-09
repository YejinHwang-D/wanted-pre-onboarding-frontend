import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
`;
const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #8d8daa;
  color: white;
`;
const LogoDiv = styled.div`
  margin-left: 3em;
`;
const SignDiv = styled.div`
  margin-right: 3em;
  display: flex;
`;
const P = styled.p`
  margin-left: 1em;
`;

function Header() {
  return (
    <HeaderStyled>
      <LogoDiv>
        <LinkStyled to="/">
          <p>프리온보딩 프론트엔드</p>
        </LinkStyled>
      </LogoDiv>
      <SignDiv>
        <LinkStyled to="/signin">
          <P>로그인</P>
        </LinkStyled>
        <LinkStyled to="signup">
          <P>회원가입</P>
        </LinkStyled>
      </SignDiv>
    </HeaderStyled>
  );
}

export default Header;
