import { useRecoilState, useRecoilValue } from "recoil";
import { RecordingState, AudioDataState, RecordCountState } from "../../recoil/RecordAtom";
import { customAxios } from "../../libs/axios";
import { useState, useEffect } from "react";
import styles from "./Script.module.css";
import * as AWS from "aws-sdk";

const Script: React.FC = () => {
  const [recordCount, setRecordCount] = useRecoilState(RecordCountState);

  // 스크립트 state설정
  const [scriptId, setScriptId] = useState();
  const [nextScriptId, setNextScriptId] = useState();
  const audioUrl = useRecoilValue(AudioDataState);

  const [recordingStatus, setRecordingStatus] = useRecoilState(RecordingState);
  const [voiceId, setVoiceId] = useState();

  useEffect(() => {
    customAxios
      .get("progressingVoices")
      .then(res => {
        console.log(`스크립트 페이지에서 voiceId:`, res.data.response.voiceId)
        setVoiceId(res.data.response.voiceId);
      })
      .catch(error => {
        console.error("스크립트 페이지에서 오류:", error);
      });
  }, []);

  // 스크립트 내용
  const [nowScript, setNowScript] = useState("");
  const [nextScript, setNextScript] = useState("");

  // 최신 스크립트 상태 get
  useEffect(() => {
    voiceId &&
      customAxios
        .get(`records/recent/${voiceId}`)
        .then(res => {
          console.log('스크립트 get 요청 성공 ID는', res.data.response)
          setScriptId(res.data.response);
        })
        .catch(err => {
          console.error("스크립트 get 요청 에러", err);
        });
  }, [voiceId]);

  // 스크립트 get
  useEffect(() => {
    customAxios
      .get(`nextScripts/${scriptId}`)
      .then(res => {
        // console.log('다음 스크립트 get 요청 성공 내용은', res.data.response.script)
        // console.log('다음 스크립트 get 요청 성공 ID는', res.data.response.scriptId)
        setNowScript(res.data.response.script);
        setNextScriptId(res.data.response.scriptId);
      })
      .catch(err => {
        console.error("다음 스크립트 get 요청 에러", err);
      });
  }, [scriptId]);

  // 다음 스크립트 get
  useEffect(() => {
    customAxios
      .get(`nextScripts/${nextScriptId}`)
      .then(res => {
        // console.log('두번째 스크립트 get 요청 성공 다음 스크립트 내용은', res.data.response.script)
        setNextScript(res.data.response.script);
      })
      .catch(err => {
        console.error("두번째 스크립트 get요청 실패다", err);
      });
  }, [nextScriptId]);

  const goNext = async () => {
    // console.log(`gonext`)
    if (recordingStatus !== "stopped"){
      alert("녹음이 완료되어야 다음으로 넘어갈 수 있습니다.");
      return;
    }
    if (recordingStatus === "stopped") {
      let blob = new Blob([audioUrl], { type: "audio/wav" });
      let url = URL.createObjectURL(blob);
      // console.log(url);

      const formData = new FormData();

      // 원본 오디오 데이터 가져옴
      let response = await fetch(url);
      let data = await response.arrayBuffer();

      let wavBlob = new Blob([data], { type: "audio/wav" });

      // Here, you can set the filename for your wav file.
      formData.append("file", wavBlob, "filename.wav");

      customAxios
        .post(`records?voiceId=${voiceId}&scriptId=${nextScriptId}`, formData)
        .then(res => {
          // console.log("녹음하고 보낸거"+res.data.response);
        })
        .catch(err => {
          console.error("녹음한 파일 전송 실패", err);
        });
    }

    customAxios
      .get(`records/count/${voiceId}`)
      .then(res => {
        // console.log('진행률 요청 성공', res)
        setRecordCount(res.data.response.recordCount); // 진행률 정보 업데이트
      })
      .catch(err => {
        console.error("진행률 요청 실패", err);
      });

    setScriptId(nextScriptId);
    customAxios.get(`nextScripts/${nextScriptId}`).then(res => {
      // console.log(`넘어가기 성공`, res)
    });
    if (recordingStatus === "stopped") {
      // console.log("녹음이 완료되었습니다. 다음으로 넘어갑니다.")
      setRecordingStatus("idle");
    }
  };

  return (
    <div>
      <div className={styles.text}>
        <div className={styles.text_now}>{nowScript}</div>
        <div className={styles.text_next}>Next {nextScript}</div>
      </div>

      <hr className={styles.hr} />

      <div className={styles.btn}>
        <div
          className={styles.record2}
          onClick={() => {
            // console.log("다시 녹음 버튼 클릭");
            setRecordingStatus("idle");
          }}
        >
          다시 녹음
        </div>
        <div
          className={recordingStatus === "stopped" ? styles.next : styles.nextDisabled}
          onClick={goNext}
        >
          {recordingStatus === "stopped" ? "다음" : "녹음 필요"}
        </div>
      </div>
    </div>
  );
};

export default Script;
