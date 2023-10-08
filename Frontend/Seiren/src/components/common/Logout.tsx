import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로컬 스토리지의 모든 항목 삭제
    localStorage.clear();

    // 로그아웃 후 메인 페이지로 이동
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className={styles.logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
