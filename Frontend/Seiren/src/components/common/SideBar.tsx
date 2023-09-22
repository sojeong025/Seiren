import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SideBar.module.css';
import MyInfo from '../MyProfile/MyInfo';

const menuItems = [
    { text: "홈", link: "/" },
    { text: "마이페이지", link: "/my-page" },
    { text: "구매내역", link: "/buy-list" },
    { text: "판매내역", link: "/sell-list" },
    { text: "사용", link: "/use-voice" },
];

function SideBar() {
    // 현재 경로 가져오기
    const location = useLocation();

    return (
        <div className={styles.sidebar}>
            <MyInfo/>
            <ul className={styles['sidebar-list']}>
                {menuItems.map((item, index) => (
                    <li key={index} className={styles.li}>
                        <Link
                            className={` ${location.pathname === item.link ? styles.active : ''}`}
                            to={item.link}
                        >
                            {item.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;
