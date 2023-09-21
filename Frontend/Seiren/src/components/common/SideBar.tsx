import React from 'react';
import styles from './SideBar.module.css'; // 모듈 CSS 파일 import

const menuItems = [
    { text: "홈", link: "/" },
    { text: "프로필", link: "/profile" },
    { text: "문의하기", link: "/contact" },
    { text: "마이페이지", link: "/my-page" },
    { text: "구매내역", link: "/buy-list" },
    { text: "판매내역", link: "/sell-list" },
    { text: "사용", link: "/use-voice" },
];

function SideBar() {
    return (
        <div className={styles.sidebar}>
            <h2 className={styles.h2}>메뉴</h2>
            <ul className={styles['sidebar-list']}>
                {menuItems.map((item, index) => (
                    <li key={index} className={styles.li}>
                        <a className={styles.a} href={item.link}>{item.text}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;
