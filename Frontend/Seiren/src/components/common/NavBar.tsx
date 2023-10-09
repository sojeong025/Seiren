import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate, NavLinkProps } from "react-router-dom";
import styles from "./NavBar.module.css";
import { UserState } from "../../recoil/UserAtom";
import { customAxios } from "../../libs/axios";
import Logout from "./Logout";
import { useRecoilState } from "recoil";
import { MdOutlineLogin } from "react-icons/md";
import Alertmemo from "./Alertmemo";
// import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
// import EventSource from 'react-native-event-source';

function NavBar() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<string | ((prevState: string) => string)>("up");
  const [scrollY, setScrollY] = useState(0);
  const isKakaoLoggedIn = localStorage.getItem("kakaoLogin") === "true";
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(UserState);
  const location = useLocation();
  const [userId, setUserId] = useState();
  const [alert, setAlert] = useState(false);
  const menuItems = [
    { addLink: "/about", className: styles.aboutLink },
    { addLink: "/voice-market", className: styles.storeLink },
    { addLink: "/purchase/", className: styles.aboutLink },
  ];
  const [alertNum, setAlertNum] = useState(0); // 초기값을 0으로 설정

  // const EventSource = EventSourcePolyfill || NativeEventSource;
  const accessToken = localStorage.getItem("accessToken");
  // console.log(location.pathname);
  useEffect(() => {
    console.log(isKakaoLoggedIn);
    console.log("sse 연결 요청");
    if (isKakaoLoggedIn && userId) {
      let eventSource;
      async function fetchSse() {
        try {
          eventSource = new EventSource(`https://j9e105.p.ssafy.io/api/sse/connect?userId=${userId}`);
          eventSource.addEventListener("CONNECT", e => {
            console.log(e);
          });
          eventSource.addEventListener("TRAINING", e => {
            console.log(e);
          });
          eventSource.addEventListener("PURCHASE", e => {
            console.log(e);
          });
          // handleAlert();
          setAlert(!alert);
          eventSource.onerror = event => {
            if (event.currentTarget.readyState === EventSource.CLOSED) {
              setTimeout(fetchSse, 5000);
            } else if (!event.error.message.includes("No activity")) {
              eventSource.close();
            }
          };
        } catch (error) {
          console.log(error);
        }
      }
      fetchSse();
      return () => eventSource.close();
    }
  }, [isKakaoLoggedIn, userId]);

  useEffect(() => {
    accessToken &&
      customAxios.get("user").then(response => {
        let userData = response.data.response;
        let updatedUserData = {
          nickname: userData.nickname,
          profileImage: userData.profileImg,
        };
        setUserInfo(updatedUserData);
        setUserId(userData.userId);
        setAlertNum(userData.newNotifyCount)
      });
  }, [location, alert]);

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

  // const handleAlert = () => {
  //   customAxios.get("notifies").then(res => {
  //     setalert(res.data.response.length);
  //     console.log("알람", res.data.response);
  //   });
  // };

  const handleProfileClick = () => {
    setIsLogoutOpen(!isLogoutOpen); // 프로필 이미지 클릭 시 isLogoutOpen 값을 반전
  };

  return (
    location.pathname !== "/my-page" && <div
      className={`${scrollY !== 0 ? styles.opaque : styles.container} ${
        scrollDirection === "down" ? styles.scrollDown : ""
      } ${
        menuItems.some(item => location.pathname.startsWith(item.addLink))
          ? menuItems.find(item => location.pathname.startsWith(item.addLink))?.className
          : ""
      }`}
    >
      <div className={styles.content}>
        {/* 로고자리 */}
        <NavLink to="/" className={styles.logo}>
          Seiren
        </NavLink>

        <div className={styles.top}>
          <div className={styles.nav}>
            <NavLink to="/about" className={location.pathname === "/about" ? styles.activeLink : ""}>
              About
            </NavLink>
            <NavLink to="/voice-market" className={location.pathname === "/voice-market" ? styles.activeLink : ""}>
              Store
            </NavLink>
            <NavLink to="/voice-study" className={location.pathname === "/voice-study" ? styles.activeLink : ""}>
              Record
            </NavLink>
            <NavLink to="/my-page" className={location.pathname === "/my-page" ? styles.activeLink : ""}>
              Mypage
            </NavLink>
          </div>

          <div className={styles.profile}>
            {isKakaoLoggedIn ? (
              <>
                {userInfo.profileImage && 
                <img 
                  className={styles.proImg} 
                  src={userInfo.profileImage} 
                  alt="Profile"
                  onClick={handleProfileClick}/>
                }
                <Alertmemo alertNum={alertNum}/>
                <div className={styles.logout}>
                  {isLogoutOpen && <Logout />}
                </div>
              </>
            ) : (
              <div className={styles.login} onClick={handleLoginClick}>
                <MdOutlineLogin/> &nbsp; Login
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
