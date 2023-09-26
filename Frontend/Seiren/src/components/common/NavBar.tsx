import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // useNavigate 추가
import styles from "./NavBar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
// import Logo from "../../assets/logo.png";
import useScrollDirection from "../../hooks/useScrollDirection";
import { UserState } from '../../recoil/UserAtom';
import { useRecoilValue } from 'recoil';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useScrollDirection("up");
  const [scrollY, setScrollY] = useState(0);
  const userInfo = useRecoilValue(UserState);
  const isKakaoLoggedIn = localStorage.getItem('kakaoLogin') === 'true';
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 이동을 처리할 수 있게 추가

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      if (newScrollY > scrollY) {
        //@ts-ignore
        setScrollDirection("down");
      } else if (newScrollY < scrollY) {
        //@ts-ignore
        setScrollDirection("up");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY, scrollDirection, setScrollDirection]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div
      className={`${scrollY !== 0 ? styles.opaque : styles.container} ${
        scrollDirection === "down" ? styles.scrollDown : ""
      }`}
    >
      <div className={styles.content}>
        {/* 로고자리 */}
        <NavLink to="/" className={styles.logo}>
          Serien
        </NavLink>

        <div className={styles.nav}>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/voice-market">Store</NavLink>
          <NavLink to="/voice-study">Record</NavLink>
          <NavLink to="/my-page">MyPage</NavLink>

          {isKakaoLoggedIn ? (
            <img className={styles.proImg} src={userInfo.profileImage} alt="Profile" />
          ) : (
            <div className={styles.login} onClick={handleLoginClick}>LOGIN</div>
          )}
        </div>

      </div>
    </div>
  );
}

export default NavBar;
