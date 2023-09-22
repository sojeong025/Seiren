import { Link, useLocation } from "react-router-dom";
import styles from "./SideBar.module.css";
import MyInfo from "../MyProfile/MyInfo";

const menuItems = [
  { text: "홈", link: "/" },
  { text: "프로필", link: "/my-page" },
  { text: "구매내역", link: "/buy-list" },
  { text: "판매내역", link: "/sell-list" },
  { text: "사용", link: "/use-voice" },
];

function SideBar() {
  const location = useLocation();

  return (
    <div className={styles.sidebar}>
      <MyInfo />
      <div className={styles["sidebar-list"]}>
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link className={` ${location.pathname === item.link ? styles.active : ""}`} to={item.link}>
              {item.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
