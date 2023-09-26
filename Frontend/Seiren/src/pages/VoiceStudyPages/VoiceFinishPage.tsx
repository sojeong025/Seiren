import styles from './VoiceFinishPage.module.css'
import { customAxios } from '../../libs/axios';
import { NavLink } from 'react-router-dom';

function VoiceFinishPage() {
  const getProduct = () => {
    customAxios.get("progressingVoices")
      .then((res) => {
        console.log("목소리 정보 가져오기", res)
      })
      .catch((err) => console.log(err))
    };

  return(
    <div className={styles.container}>
      <button>마이페이지에서 확인하기</button>
      <NavLink to="/product-custom">
        <button onClick={getProduct}>장터에 올리기</button>
      </NavLink>
    </div>
  );
};

export default VoiceFinishPage;