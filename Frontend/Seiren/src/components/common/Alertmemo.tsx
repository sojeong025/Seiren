import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { customAxios } from "../../libs/axios";
import { BiSolidMicrophone } from "react-icons/bi";
import styles from "./Alertmemo.module.css";

function AlertMemo({alertNum, setAlertNum}) {
  const navigate = useNavigate();

  const [ notificationType, setNotificationType] = useState([]);
  const [ created, setCreated ] = useState([]);
  
  const [alertContent, setAlertContent] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false); 

  const menuItems = [
    { addLink: "/about", className: styles.aboutLink },
  ];
// 현재 페이지의 경로
const currentPath = location.pathname;

// "/about" 링크에 해당하는 클래스 이름 찾기
const menuItem = menuItems.find(item => currentPath.startsWith(item.addLink));

// 클래스 이름을 동적으로 설정
const className = menuItem ? `${styles.alerticon} ${menuItem.className}` : styles.alerticon;

  useEffect(() => {
    if(isAlertOpen){
      customAxios.get("notifies").then(res => {
        const alerts = res.data.response;
        const contentArray = alerts.map(alert => alert.content);
        setAlertContent(contentArray);
        console.log("상태확인", res)
        const typeArray = res.data.response.map(type => type.notificationType)
        setNotificationType(typeArray)
        const timeArray = res.data.response.map(time => time.createdAt)
        setCreated(timeArray)
        setAlertNum(0);
      });
    }
  }, [isAlertOpen]);
  

  const toggleAlert = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  const handleBoxClick = (notificationType) => {
    switch(notificationType) {
    case "PURCHASE":
      navigate("/sell-list");
      break;
    case "TRAINING":
      navigate("/voice-finish");
    break;
    default: break;
    }
  }

  function isToday(dateString) {
    var today = new Date();
    var dateCheck = new Date(dateString);
  
    return dateCheck.getDate() == today.getDate() &&
      dateCheck.getMonth() == today.getMonth() &&
      dateCheck.getFullYear() == today.getFullYear();
  }

  return (
    <div className={styles.alert} onClick={toggleAlert}>
      <div className={className}><BiSolidMicrophone size={40} /></div>
      <div className={styles.alertNum}>{alertNum}</div>

      {isAlertOpen && (
        <div className={styles.alertPopup}>
        <div className={styles.content}>
          <div className={styles.text}>오늘 받은 알림</div>
            {alertContent.map((content,index) =>
            (
              isToday(created[index]) && (
                <div key={index} onClick={() => handleBoxClick(notificationType[index])}>
                <div className={styles.box}>{content}</div>
              </div>
            )
          ))}

          <div className={styles.text}>이전 알림</div>
          {alertContent.map((content,index) =>
            (
              !isToday(created[index]) && (
                <div key={index} onClick={() => handleBoxClick(notificationType[index])}>
                <div className={styles.box}>{content}</div>
              </div>
              )
            ))}
        </div>
        
        </div>)}
      </div>);
    }

export default AlertMemo;

