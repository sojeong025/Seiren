import { Link, useLocation, NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import MyInfo from "../MyProfile/SideBar/MyInfo";
import { IoIosArrowBack } from "react-icons/io";


function SideBar() { 
  const location = useLocation();
  const isNumeric = /^\d+$/;
  const menuItems = [
    { text: "프로필", link: "/my-page" },
    { text: "판매내역", link: "/sell-list", addLink: `/sell-list/detail` },
    { text: "구매내역", link: "/buy-list" },
    { text: "사용", link: "/use-voice", addLink: `/voice-detail/` },
  ];
  
  return (
    <div className={styles.sidebar}>
      <div className={styles.main}>
        <NavLink to="/">
          <IoIosArrowBack /> Seiren
        </NavLink>
      </div>
      <MyInfo />
      <span></span>
      <div className={styles.sidebarlist}>
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link
              className={`${
                location.pathname === item.link ||
                (item.addLink && location.pathname.startsWith(item.addLink) && location.pathname !== item.link) 
                  ? styles.active
                  : ""
              }`}
              to={item.link}
            >
              {item.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
