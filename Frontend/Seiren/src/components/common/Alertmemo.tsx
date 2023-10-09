import { useState, useEffect } from "react";
import { customAxios } from "../../libs/axios";
import { HiOutlineBellAlert } from "react-icons/hi2";
import styles from "./Alertmemo.module.css";

function AlertMemo({alertNum}) {
  
  const [alertContent, setAlertContent] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false); // 알람 팝업 열림 여부 상태 추가

  useEffect(() => {
    if(isAlertOpen){
      customAxios.get("notifies").then(res => {
        const alerts = res.data.response;
        const contentArray = alerts.map(alert => alert.content);
        setAlertContent(contentArray);
        console.log("asd", contentArray);
      });
    }
  }, [isAlertOpen]);
  

  const toggleAlert = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  return (
    <div className={styles.alert} onClick={toggleAlert}>
      <HiOutlineBellAlert size={28} />
      <div className={styles.alertNum}>{alertNum}</div>
      {isAlertOpen && (
        <div className={styles.alertPopup}>
          <div className={styles.content}>
            {alertContent.map((content, index) => (
              <div key={index}>{content}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertMemo;
