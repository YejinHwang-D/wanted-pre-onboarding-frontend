import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p>프리온보딩 프론트엔드</p>
      </div>
      <div className={styles.sign}>
        <p>로그인</p>
        <p>회원가입</p>
      </div>
    </header>
  );
}

export default Header;
