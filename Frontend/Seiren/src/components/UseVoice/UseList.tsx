// UseList.tsx
import { useState, useEffect } from "react";
import { customAxios } from "../../libs/axios";
import { BiSolidDownload } from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import styles from "./UseList.module.css";
import axios from "axios";
import ReactPlayer from "react-player";

interface UseListProps {
  transactionid: string;
  checkSend: boolean;
}

function UseList({ transactionid, checkSend }: UseListProps) {
  const [useList, setUseList] = useState([]);
  const [isWindow, setIsWindow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectKey, setSelectKey] = useState();
  const [selectUrl, setSelectUrl] = useState("");

  useEffect(() => {
    setIsWindow(true);
  }, []);
  const handleBtn = (idx, url) => {
    setIsPlaying(!isPlaying);
    setSelectKey(idx);
    setSelectUrl(url);
  };

  useEffect(() => {
    customAxios
      .get(`transactions/history?transactionid=${transactionid}&page=1`)
      .then(response => {
        const responseData = response.data.response;
        // console.log("useList : ", responseData);
        setUseList(responseData);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [transactionid, checkSend]);

  const downloadMp3 = (url, text) => {
    // console.log(text);
    // console.log(url);
    const a = document.createElement("a");
    a.href = url;
    a.download = text;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 60000);
    a.remove();
  };

  return (
    <div>
      {isWindow && (
        <div>
          <div className={styles.mainTxt}>사용 내역</div>
          <div className={styles.table}>
            {useList.map((item, idx) => (
              <div key={item.createAt} className={styles.useWrap}>
                <div className={styles.text}>{item.text}</div>
                <div className={styles.date}>{item.createAt.substr(0, 10)}</div>
                <div className={styles.playBtn}>
                  {isPlaying && selectKey === idx ? (
                    <AiFillPauseCircle onClick={() => handleBtn(idx, item.mp3Url)} className={styles.playBtnChild} />
                  ) : (
                    <AiFillPlayCircle className={styles.playBtnChild} onClick={() => handleBtn(idx, item.mp3Url)} />
                  )}
                </div>
                <BiSolidDownload onClick={() => downloadMp3(item.mp3Url, item.text)} className={styles.downBtn} />
                <ReactPlayer
                  url={selectUrl === item.mp3Url ? item.mp3Url : ""}
                  playing={isPlaying}
                  width={"0%"}
                  height={"0%"}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UseList;
