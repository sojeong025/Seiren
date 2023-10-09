import { useState, useEffect } from "react";
import { customAxios } from "../../libs/axios";
import { BiSolidMicrophone } from "react-icons/bi";
import styles from "./Alertmemo.module.css";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';



function AlertMemo({alertNum}) {
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: '#000',
      fontSize: 14,
      fontFamily: 'S-CoreDream-4Regular',
      borderRadius: '20px',
      padding: '10px 15px',
      border: '2px solid #ed5808',
    },
  }));
  
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
      <LightTooltip title="알림 확인" arrow>
        <div className={styles.alerticon}><BiSolidMicrophone size={40} /></div>
      </LightTooltip>
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
