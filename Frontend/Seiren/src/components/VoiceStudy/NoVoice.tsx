import { customAxios } from "../../libs/axios";
import styles from './NoVoice.module.css'
import { useEffect, useState } from "react";
import { LiaRandomSolid } from 'react-icons/lia'
import { FunctionComponent } from 'react';

interface NoVoiceProps {
  setSuccess: (value: boolean) => void;
}

const NoVoice: FunctionComponent<NoVoiceProps> = ({ setSuccess }) => {
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
        setSuccess(true);
      })
      .catch((error) => console.log(error));
  };

  const voiceNameChange = (e) =>{
      // console.log(e.target.value);
      setVoiceTitle(e.target.value);
  }
  const voiceMemoChange = (e) => {
    // console.log(e.target.value);
    setMemo(e.target.value);
  }

  const generateRandomAvatar = () => {
    const randomEyebrows = Math.floor(Math.random() * 15) + 1; // 눈썹
    const randomEyes = Math.floor(Math.random() * 26) + 1; // 눈
    const randomHairType = Math.random() < 0.5 ? 'long' : 'short'; // 머리 길이
    const randomHairNumberLong = Math.floor(Math.random() * (26 -1)) +1; // long
    const randomHairNumberShort= Math.floor(Math.random()* (19 -1)) +1; // short
    
    let hairVariant; // 머리 카락
      if(randomHairType === 'long'){
          hairVariant= `${randomHairType}${String(randomHairNumberLong).padStart(2,'0')}`
      }
      else{
          hairVariant= `${randomHairType}${String(randomHairNumberShort).padStart(2,'0')}`
      }
      const randomMouth = Math.floor(Math.random() *30) +1 ;
      
    var skinColorArray=["9e5622","763900","ecad80", "f2d3b1"]; // 피부색
    var skinColorRandom=skinColorArray[Math.floor(Math.random()*skinColorArray.length)];
    var hairColorArray=["0e0e0e","3eac2c","6a4e35","85c2c6","796a45","562306",
                      "592454","ab2a18","ac6511", "afafaf", "b9a05f", 
                      "cb6820", "dba3be", "e5d7a3"];
    var hairColorRandom=hairColorArray[Math.floor(Math.random()*hairColorArray.length)]; // 머리카락 색

    
    // 최종 캐릭터
    let dicebearUrl=`https://api.dicebear.com/7.x/adventurer/svg?flip=true&eyebrows=${`variant${String(randomEyebrows).padStart(2,'0')}`}&eyes=${`variant${String(randomEyes).padStart(2,'0')}`}&hair=${hairVariant}&mouth=${`variant${String(randomMouth).padStart(2,'0')}`}&skinColor=${skinColorRandom}&hairColor=${hairColorRandom}`;
    
    console.log(dicebearUrl);
    setImgUrl(dicebearUrl);
  };

  useEffect(generateRandomAvatar, []);

  return(
    <div className={styles.container}>
      {/* 목소리 custom 부분 */}
      <div className={styles.custom}>

        {/* 왼쪽: 아바타 */}
        <div className={styles.avatar}>
          {/* <UploadImg imgUrl={imgUrl} setImgUrl={setImgUrl}/> */}
          <div><img src={imgUrl} alt="avatar"/></div>
          <div className={styles.btn_random} onClick={generateRandomAvatar}>
            Randomize <LiaRandomSolid /></div>
        </div>

        {/* 오른쪽: 설명 */}
        <div className={styles.step1}>
          <div className={styles.box}>
            <div className={styles.title}>1. 목소리 이름을 등록해주세요 <span> * 필수</span></div>
            <input
            className={styles.input}
            type="text"
            value={voiceTitle}
            onChange={(e) =>voiceNameChange(e)}
            required
            />
          </div>

          <div>
            <div>2. 목소리 설명을 등록해주세요</div>
            <textarea
            className={styles.textarea}
            name="memo" 
            id="memo" 
            rows={5}
            value={memo}
            onChange={(e)=>voiceMemoChange(e)}
            ></textarea>
          </div>

          <div className={styles.btn} onClick={makeVoice}>목소리 생성</div>
        </div>
      </div>
    </div>
  )
}

export default NoVoice;
