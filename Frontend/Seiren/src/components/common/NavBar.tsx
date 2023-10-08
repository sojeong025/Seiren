import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate, NavLinkProps } from "react-router-dom";
import styles from "./NavBar.module.css";
import { UserState } from "../../recoil/UserAtom";
import { customAxios } from "../../libs/axios";
import Logout from "./Logout";
import { useRecoilState } from "recoil";
import {EventSourcePolyfill} from "event-source-polyfill";

function NavBar() {
  const [scrollDirection, setScrollDirection] = useState<string | ((prevState: string) => string)>("up");
  const [scrollY, setScrollY] = useState(0);
  const isKakaoLoggedIn = localStorage.getItem("kakaoLogin") === "true";
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(UserState);
  const location = useLocation();
  const menuItems = [
    { addLink: "/about", className: styles.aboutLink },
    { addLink: "/voice-market", className: styles.storeLink },
    { addLink: "/purchase/", className: styles.aboutLink },
  ];

  const EventSource = EventSourcePolyfill;
  const accessToken = localStorage.getItem("accessToken");

  useEffect(()=>{
    console.log(isKakaoLoggedIn);
    console.log("sse 연결 요청");
    if(isKakaoLoggedIn){
      let eventSource;
      const fetchSse = async () =>{
        try{
          eventSource = new EventSource(`http://j9e105.p.ssafy.io:8082/api/sse/connect`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            withCredentials:true,
          });
          /* 연결 */
          eventSource.onopen = async (e) =>{
            const res = await e;
            console.log(res)
          }
          /* EVENTSOURCE ONMESSAGE */
          eventSource.onmessage = async (e) =>{
            const res = await e.data;
            console.log(res);
          };

          eventSource.onerror = async (event) =>{
            if(!event.error.message.includes("No activity")){
              eventSource.close();
            }
          }
        }catch(error){
          console.log(error);
        }
      };
      fetchSse();
      return () => eventSource.close();
    }
  })

  useEffect(() => {
    customAxios.get("user").then(response => {
      let userData = response.data.response;

      let updatedUserData = {
        nickname: userData.nickname,
        profileImage: userData.profileImg,
      };
      setUserInfo(updatedUserData);
    });
  }, [location]);

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
            MyPage
          </NavLink>

          {isKakaoLoggedIn ? (
            <>
              {userInfo.profileImage && <img className={styles.proImg} src={userInfo.profileImage} alt="Profile" />}
              <Logout />
            </>
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
