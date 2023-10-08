import { useNavigate } from "react-router-dom";
import styles from "./VoiceStudyHeader.module.css";
import { customAxios } from "../../libs/axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { RecordCountState } from "../../recoil/RecordAtom";
import axios from "axios";

const VoiceStudyHeader: React.FC = () => {
  const [voiceId, setVoiceId] = useState();
  const [recordCount, setRecordCount] = useRecoilState(RecordCountState);
  const [totalCount, setTotalCount] = useState(1);
  const [zipVoice, setZipVoice] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    customAxios
      .get("progressingVoices")
      .then(res => {
        // console.log(`학습완료시에서 voiceId:`, res.data.response.voiceId)
        setVoiceId(res.data.response.voiceId);
      })
      .catch(error => {
        console.error("학습완료시에서 오류:", error);
      });
  }, [voiceId]);

  const navigate = useNavigate();
  const handleButtonClick = () => {
    customAxios
      .get(`voices/zip?voiceId=${voiceId}`)
      .then(res => {
        // console.log("zip파일 생성", res);
        setZipVoice(res.data.response);

        return axios.get(`https://j9e105.p.ssafy.io/ai1/upload?voice_id=${voiceId}&zipURL=${res.data.response}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
      .catch(err => {
        console.error("zip파일 생성 실패", err);
      });

    axios
      .get(`https://j9e105.p.ssafy.io/ai1/upload?voice_id=${voiceId}&zipURL=${zipVoice}`)
      .then(res => {
        // console.log("목소리 학습 버튼 클릭 시 ai 연결 성공", res);
        navigate(`/voice-studying/${voiceId}`);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    customAxios
      .get(`records/count/${voiceId}`)
      .then(res => {
        // console.log("진행률 요청 성공", res);
        setRecordCount(res.data.response.recordCount);
        setTotalCount(res.data.response.totalCount);
      })
      .catch(err => {
        console.error("진행률 요청 실패", err);
      });
  }, []);

  let progress;
  if (recordCount <= 100) {
    progress = (recordCount / 100) * 80;
  } else {
    const additionalProgress = ((recordCount - 100) / (totalCount - 100)) * 20;
    progress = 80 + additionalProgress;
  }
  const isButtonDisabled = recordCount < 3;

  return (
    <div className={styles.header}>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
      {/* isButtonDisabled 값에 따라 버튼의 disabled 속성 설정 */}
      <button className={styles.button_study} disabled={isButtonDisabled} onClick={handleButtonClick}>
        목소리 학습
      </button>
    </div>
  );
};

export default VoiceStudyHeader;
