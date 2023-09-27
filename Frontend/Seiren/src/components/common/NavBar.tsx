import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import useScrollDirection from "../../hooks/useScrollDirection";
import { UserState } from "../../recoil/UserAtom";
import { customAxios } from "../../libs/axios";
import { useRecoilState } from "recoil";

function NavBar() {
  const [scrollDirection, setScrollDirection] = useState<string | ((prevState: string) => string)>("up");
  const [scrollY, setScrollY] = useState(0);
  const isKakaoLoggedIn = localStorage.getItem("kakaoLogin") === "true";
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(UserState);

  useEffect(() => {
    customAxios.get("user").then(response => {
      let userData = response.data.response;

      let updatedUserData = {
        nickname: userData.nickname,
        profileImage: userData.profileImg,
      };
      setUserInfo(updatedUserData);
      console.log(updatedUserData.nickname);
      console.log("recoil 저장 성공");
    });
  }, []);

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

  const handleLoginClick = () => {
    navigate("/login");
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
            <div className={styles.login} onClick={handleLoginClick}>
              LOGIN
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
