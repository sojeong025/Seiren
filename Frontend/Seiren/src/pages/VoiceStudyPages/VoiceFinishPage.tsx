import styles from './VoiceFinishPage.module.css'
import { customAxios } from '../../libs/axios';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import market from "../../assets/img/market.png";
import mypageimg from "../../assets/img/mypage.png";
import { useEffect, useState } from 'react';

function VoiceFinishPage() {
  const [voiceId, setVoiceId] = useState();
  
  useEffect(() => {
    customAxios.get("progressingVoices")
      .then((res) => {
        console.log('목소리 상태 호출', res)
        if (res.data.response) { // response 객체가 있는지 확인
          console.log(`voiceId:`, res.data.response.voiceId)
          setVoiceId(res.data.response.voiceId);
        } else {
        }
      })
      .catch((error) => {
        console.error('목소리 상태 호출 중 오류:', error);
      });
  }, []);

  return(
    <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={styles.container}>
      <div className={styles.mainTxt}>
        목소리 학습이 완료되었습니다
      </div>
      <div className={styles.sideTxt}>
      당신의 독특한 목소리는 <span>마이페이지에서 확인</span>하실 수 있습니다.<br />
      새롭게 학습된 목소리로 개인화된 경험을 즐겨보세요. 또한, 이제 당신의 목소리는 소중한 자산이 될 수 있습니다.<br/>
      <span>스토어에 등록</span>하고, 전 세계와 공유하여 추가 수익을 창출할 기회를 놓치지 마세요.
      </div>
      <div className={styles.page}>
        <div className={styles.mypage}>
          <div className={styles.mypage_img}>
            <img src={market} alt="마이페이지" />
          </div>
          <NavLink to="/my-page">
            <div className={styles.mypage_link}>마이페이지에서 확인하기</div>
          </NavLink>
          <div className={styles.mypage_txt}>목소리 관리</div>
          <NavLink to="/my-page">
            <div className={styles.mypage_underlink}>자세히 보기</div>
          </NavLink>

        </div>
        <div className={styles.market}>
          <div className={styles.market_img}>
            <img src={mypageimg} alt="마이페이지" />
          </div>
          <NavLink to="/product-custom">
            <div className={styles.market_link}>스토어에 등록하기</div>
          </NavLink>
          <div className={styles.market_txt}>공유 및 수익 창출</div>
          <NavLink to={`/product-custom/${voiceId}`}>
            <div className={styles.end}>
              <div className={styles.market_underlink}>자세히 보기</div>
            </div>
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};


export default VoiceFinishPage;