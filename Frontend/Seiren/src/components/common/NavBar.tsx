import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "../../assets/logo.png";
import useScrollDirection from "../../hooks/useScrollDirection";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useScrollDirection("up");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      if (newScrollY > scrollY) {
        // 스크롤 방향이 아래로 스크롤됨
        setScrollDirection("down");
      } else if (newScrollY < scrollY) {
        // 스크롤 방향이 위로 스크롤됨
        setScrollDirection("up");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY, scrollDirection, setScrollDirection]);
  console.log(scrollDirection);
  console.log(scrollY);

  return (
    <div className={`${scrollY !== 0 ? styles.opaque : styles.container} ${scrollDirection === "down" ? styles.scrollDown : ""}`}>
      <div className={styles.content}>
        {/* logo 자리  */}
        <NavLink to="/" className={styles.logo}>
          <img src={Logo} className={styles.logo} alt="" />
        </NavLink>

        {/* 메뉴 자리 */}
        <div className={styles.btn} onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineMenu />
        </div>
        {(window.innerWidth > 768 || isOpen) && (
          <div className={styles.nav}>
            <NavLink to="/about">프로그램 소개</NavLink>
            <NavLink to="/voice-market">목소리 장터</NavLink>
            <NavLink to="/voice-study">목소리 등록</NavLink>
            <NavLink to="/my-page">마이페이지</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
