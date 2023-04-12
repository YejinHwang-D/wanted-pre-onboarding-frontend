import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthStateContext } from '../context/authContext';
import styled from 'styled-components';
import useAuth from '../context/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faB, faBars } from '@fortawesome/free-solid-svg-icons';

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #96baff;
  color: white;
  height: 4em;
`;
const LogoDiv = styled.div`
  margin-left: 3em;
`;
const SignDiv = styled.div`
  margin-right: 3em;
  display: flex;
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  transition: transform 0.4s;

  &:hover {
    transform: scale(1.1);
  }
`;
const Span = styled.span`
  margin-left: 0.5em;
`;
const P = styled.p`
  margin-left: 1em;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  const user = useContext(AuthStateContext);
  const { signOut } = useAuth();

  function signoutHandler() {
    signOut();
    alert('로그아웃되었습니다.');
    navigate('/');
  }

  return (
    <HeaderStyled>
      <LogoDiv>
        <LinkStyled to="/">
          <p>프리온보딩 프론트엔드</p>
        </LinkStyled>
      </LogoDiv>
      {user ? (
        <SignDiv>
          <LinkStyled to="/todo">
            <FontAwesomeIcon icon={faBars} color="white" />
            <Span>Todo</Span>
          </LinkStyled>
          <P onClick={signoutHandler}>로그아웃</P>
        </SignDiv>
      ) : (
        <SignDiv>
          <LinkStyled to="/signin">
            <P>로그인</P>
          </LinkStyled>
          <LinkStyled to="signup">
            <P>회원가입</P>
          </LinkStyled>
        </SignDiv>
      )}
    </HeaderStyled>
  );
}

export default Header;
