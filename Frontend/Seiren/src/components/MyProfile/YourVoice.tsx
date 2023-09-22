import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { myVoiceState } from '../../recoil/UserAtom';
import { customAxios } from '../../libs/axios';
import styles from './YourVoice.module.css'

function YourComponent() {
  const [myVoice, setMyVoice] = useRecoilState(myVoiceState);

  useEffect(() => {
    customAxios.get("voices")
      .then((response) => {
        setMyVoice(response.data.response.myVoice);
      })
      .catch((error) => {
        console.log('내 목소리 API 호출 중 오류 발생:', error)
      });
    }, []);

  return (
    <div className={styles.YourVoiceContainer}>
      <h1>Your Voice</h1>
      {/* <ul>
        {myVoice.map((item) => (
          <li key={item.voiceId}>{item.voiceTitle}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default YourComponent;
