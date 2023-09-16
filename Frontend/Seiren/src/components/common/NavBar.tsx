import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { AiOutlineMenu } from "react-icons/ai";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* logo 자리  */}
        <NavLink to="/" className={styles.logo}>
          <div> Seiren </div>
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
