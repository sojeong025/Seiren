import { useState, useEffect } from "react";
import { customAxios } from "../../libs/axios";
import { HiOutlineBellAlert } from "react-icons/hi2";
import styles from "./Alertmemo.module.css";

function AlertMemo() {
  const [alertNum, setAlertNum] = useState(0); // 초기값을 0으로 설정
  const [alertContent, setAlertContent] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false); // 알람 팝업 열림 여부 상태 추가

  useEffect(() => {
    customAxios.get("notifies").then(res => {
      const alerts = res.data.response;
      const contentArray = alerts.map(alert => alert.content);
      setAlertNum(alerts.length);
      setAlertContent(contentArray);
      console.log("asd", contentArray);
    });
  }, []);

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
