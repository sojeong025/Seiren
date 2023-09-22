import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "../../assets/logo.png";
import useScrollDirection from "../../hooks/useScrollDirection";
import { UserState } from '../../recoil/UserAtom';
import { useRecoilValue } from 'recoil';
import Login from "../../pages/LoginPages/LoginPage";


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useScrollDirection("up");
  const [scrollY, setScrollY] = useState(0);
  const userInfo = useRecoilValue(UserState);
  const isKakaoLoggedIn = localStorage.getItem('kakaoLogin') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      if (newScrollY > scrollY) {
        setScrollDirection("down");
      } else if (newScrollY < scrollY) {
        setScrollDirection("up");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY, scrollDirection, setScrollDirection]);

  const myPageDropdownItems = [
    { text: "마이페이지", link: "/my-page" },
    { text: "구매내역", link: "/buy-list" },
    { text: "판매내역", link: "/sell-list" },
    { text: "사용", link: "/use-voice" },
  ];


  return (
    <div
      className={`${scrollY !== 0 ? styles.opaque : styles.container} ${
        scrollDirection === "down" ? styles.scrollDown : ""
      }`}
    >
      <div className={styles.content}>
        <NavLink to="/" className={styles.logo}>
          <img src={Logo} className={styles.logo} alt="" />
        </NavLink>

        <div className={styles.btn} onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineMenu />
        </div>
        
        {(window.innerWidth > 768 || isOpen) && (
          <div className={styles.nav}>
            <NavLink to="/about">프로그램 소개</NavLink>
            <NavLink to="/voice-market">목소리 장터</NavLink>
            <NavLink to="/voice-study">목소리 등록</NavLink>

            {/* "마이페이지" 메뉴와 드롭다운을 추가합니다. */}
            <div className={styles.dropdown}>
              <NavLink to="/my-page">마이페이지</NavLink>
              <div className={styles.dropdownContent}>
                {myPageDropdownItems.map((item, index) => (
                  <NavLink key={index} to={item.link}>
                    {item.text}
                  </NavLink>
                ))}
              </div>
            </div>
            {isKakaoLoggedIn ? (
              <img className={styles.proImg} src={userInfo.profileImage} alt="Profile" />
            ) : (
              <div className={styles.login}>Login</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
