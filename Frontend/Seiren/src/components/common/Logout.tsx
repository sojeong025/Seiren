import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";
import { customAxios } from "../../libs/axios";
import { MdOutlineLogout } from "react-icons/md"

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async() => {

    await customAxios.delete("sse/disconnect")
    .then((res)=>{
      console.log(res);
    }).catch(error => console.log(error))
    // 로컬 스토리지의 모든 항목 삭제
    localStorage.clear();
    // 로그아웃 후 메인 페이지로 이동
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className={styles.logout}>
      <MdOutlineLogout/> &nbsp;Logout
    </button>
  );
};

export default LogoutButton;
