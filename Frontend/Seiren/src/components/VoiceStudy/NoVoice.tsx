import { useNavigate } from "react-router-dom";
import { customAxios } from "../../libs/axios";
import styles from './NoVoice.module.css'
import UploadImg from "../common/UploadImg";
import { useState } from "react";

function NoVoice() {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState(null);
  const [voiceTitle, setVoiceTitle] = useState();
  const [memo, setMemo] = useState();

  const makeVoice = () => {
    customAxios.post("voices",{
      "voiceTitle":voiceTitle,
      "memo":memo,
      "voiceAvatarUrl":imgUrl
    })
      .then((res) => {
        console.log('목소리 초기 생성 성공', res);
        navigate("/voice-study");
      })
      .catch((error) => console.log(error));
  };

  const voiceNameChange = (e) =>{
      console.log(e.target.value);
      setVoiceTitle(e.target.value);
  }
  const voiceMemoChange = (e) => {
    console.log(e.target.value);
    setMemo(e.target.value);
  }

  return(
    <div className={styles.container}>
      {/* 목소리 custom 부분 */}
      <div className={styles.custom}>

        {/* 왼쪽: 아바타 */}
        <div className={styles.avatar} style={{backgroundImage:`url(${imgUrl})`, backgroundSize:'cover'}}>
          <UploadImg imgUrl={imgUrl} setImgUrl={setImgUrl}/>
        </div>

        {/* 오른쪽: 설명 */}
        <div className={styles.step1}>
          <div className={styles.box}>
            <div>1. 목소리 이름을 등록해주세요 <span>(필수)</span></div>
            <input 
            type="text"
            value={voiceTitle}
            onChange={(e) =>voiceNameChange(e)}
            />
          </div>

          <div>
            <div>2. 목소리 설명을 등록해주세요</div>
            
            <textarea 
            name="memo" 
            id="memo" 
            cols="30" 
            rows="10"
            value={memo}
            onChange={(e)=>voiceMemoChange(e)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className={styles.btn} onClick={makeVoice}>목소리 생성</div>
    </div>
  )
}

export default NoVoice;
