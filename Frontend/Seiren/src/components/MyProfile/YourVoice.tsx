import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { myVoiceState } from "../../recoil/UserAtom";
import { customAxios } from "../../libs/axios";
import styles from "./YourVoice.module.css";
import { Link } from "react-router-dom";

function YourVoice() {
  const [nickname, setNickname] = useState("");
  const [myVoice, setMyVoice] = useRecoilState(myVoiceState);
  const [state, setState] = useState();

  useEffect(() => {
    customAxios.get("user")
      .then(response => {
        setNickname(response.data.response.nickname)
      })
  }, []);

  useEffect(() => {
    customAxios
      .get("voices")
      .then(response => {
        const responseData = response.data.response;
        console.log("yourVoice : ", responseData);
        setMyVoice(responseData);
        setState(responseData.state)
      })
      .catch(error => {
        console.log("내 목소리 API 호출 중 오류 발생:", error);
      });
  }, []);


  return (
    <div className={styles.YourVoiceContainer}>
      <div className={styles.YourVoiceText}>{nickname}님의 목소리</div>
      <div className={styles.VoiceItems}>
        {myVoice.map(item => (
          <div className={styles.myvoice} key={item.voiceId}>
            <Link to={`/your-voice-detail/${item.voiceId}`}>
            <img className={styles.pimg} src={item.voiceAvatarUrl} alt={item.title} />
            
            <div className={styles.hoverState}>
              {(() => {
                switch (item.state) {
                  case 0: return "녹음 중";
                  case 1: return "학습 중";
                  case 2: return "학습 완료";
                  case 3: return "판매 중";
                  case 4: return "판매 중단";
                  default: return "";
                }
              })()}
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourVoice;
