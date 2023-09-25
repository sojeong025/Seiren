import { useNavigate } from "react-router-dom";
import { customAxios } from "../../libs/axios";
import styles from './NoVoice.module.css'
import UploadImg from "../common/UploadImg";

function NoVoice() {
  const navigate = useNavigate();

  const makeVoice = () => {
    customAxios.post("voices")
      .then((res) => {
        console.log('목소리 초기 생성 성공', res);
        navigate("/voice-study");
      })
      .catch((error) => console.log(error));
  };

  return(
    <div className={styles.container}>
      {/* 목소리 custom 부분 */}
      <div className={styles.custom}>

        {/* 왼쪽: 아바타 */}
        <div className={styles.avatar}>
          <UploadImg />
        </div>

        {/* 오른쪽: 설명 */}
        <div className={styles.step1}>
          <div className={styles.box}>
            <div>1. 목소리 이름을 등록해주세요 <span>(필수)</span></div>
            <input type="text" />
          </div>

          <div>
            <div>2. 목소리 설명을 등록해주세요</div>
            
            <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>
      <div className={styles.btn} onClick={makeVoice}>목소리 생성</div>
    </div>
  )
}

export default NoVoice;
