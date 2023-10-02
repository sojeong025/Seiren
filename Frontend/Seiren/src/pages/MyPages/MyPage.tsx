import React, { useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import Likes from '../../components/MyProfile/Likes';
import YourVoice from '../../components/MyProfile/YourVoice';
import SideBar from '../../components/common/SideBar';
import { customAxios } from '../../libs/axios';
import { BiHeadphone } from 'react-icons/bi';
import { GrTransaction } from 'react-icons/gr';

const MyPage: React.FC<{ setIsNavBarVisible: (visible: boolean) => void }> = ({
  setIsNavBarVisible,
}) => {
  const [nickname, setNickname] = useState('');
  const [ableCount, setAbleCount] = useState(0); // 기본값 설정
  const [unableCount, setUnableCount] = useState(0); // 기본값 설정
  const [oneOrLessCount, setOneOrLessCount] = useState(0);
  const [twoOrMoreCount, setTwoOrMoreCount] = useState(0);


  useEffect(() => {
    setIsNavBarVisible(false);

    return () => {
      setIsNavBarVisible(true);
    };
  }, [setIsNavBarVisible]);

  useEffect(() => {
    customAxios.get('user').then((response) => {
      setNickname(response.data.response.nickname);
    });
  }, []);

  useEffect(() => {
    customAxios
      .get(`transactions/availability`)
      .then((response) => {
        const able = response.data.response.useAbleCount;
        const unable = response.data.response.useUnableCount;
        setAbleCount(able);
        setUnableCount(unable);
      })
      .catch((error) => console.error('API 호출 중 오류 발생:', error));
  }, []);

  useEffect(() => {
    customAxios
      .get(`state/count`)
      .then((response) => {
        const oneOrLessCount = response.data.response.oneOrLessCount;
        const twoOrMoreCount = response.data.response.twoOrMoreCount;
        setOneOrLessCount(oneOrLessCount);
        setTwoOrMoreCount(twoOrMoreCount);
      })
      .catch((error) => console.error('API 호출 중 오류 발생:', error));
  }, []);

  return (
    <div className={styles.myPageContainer}>
      <SideBar />
      <div className={styles.myPageBox}>
        <div className={styles.section1}>
          <div className={styles.hi}>
            <div className={styles.hi_1}>안녕하세요,</div>
            <div className={styles.hi_2}>{nickname}님!</div>
            <div className={styles.hi_3}>
              {nickname}님의 SEIREN 보이스 스튜디오 <br />
              사용현황을 한 눈에 알려드릴게요
            </div>
          </div>
          <div className={styles.my}>
            <div className={styles.my_txt}>
              <BiHeadphone /> 마이 AI 보이스
            </div>
            <div className={styles.my_state}>
              <div>
                생성 중 <br />
                <span>{oneOrLessCount}개</span>
              </div>
              <hr />
              <div>
                생성 완료 <br />
                <span className={styles.color}>{twoOrMoreCount}개</span>
              </div>
            </div>
          </div>
          <div className={styles.my}>
            <div className={styles.my_txt}>
              <GrTransaction /> 구매 보이스
            </div>
            <div className={styles.my_state}>
              <div>
                사용 중 <br />
                <span>{ableCount}개</span>
              </div>
              <hr />
              <div>
                사용 완료 <br />
                <span className={styles.color}>{unableCount}개</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.yourVoiceContainer}>
          <YourVoice />
        </div>
        <div className={styles.likesContainer}>
          <Likes />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
