import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { customAxios } from "../../libs/axios";
import styles from "./UseVoiceDetail.module.css";
import SideBar from "../../components/common/SideBar";
import UseList from "../UseVoice/UseList";
import { RxDot } from "react-icons/rx"
import { VscSend } from "react-icons/vsc"

const UseVoiceDetail: React.FC<{ setIsNavBarVisible: (visible: boolean) => void }> = ({ setIsNavBarVisible }) => {
  useEffect(() => {
    setIsNavBarVisible(false);
    return () => {
      setIsNavBarVisible(true);
    };
  }, [setIsNavBarVisible]);

  const { productId } = useParams();
  const [voiceDetail, setVoiceDetail] = useState(null);
  const [text, setText] = useState("");
  const mL = Number(200);
  const [textLength, setTextLength] = useState(0);

  const handleTextChange = event => {
    setText(event.target.value);
    setTextLength(event.target.value.length)
  };

  // 목소리 (상품) 상세 정보 GET 
  useEffect(() => {
    customAxios
      .get(`transactions/detail/${productId}`)
      .then(response => {
        const voiceDetailData = response.data.response;
        console.log('상품 상세정보 api ', response)

        setVoiceDetail(voiceDetailData);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [productId]);

  // 사용 TEXT 서버에 전송 API

  // 차감 횟수 받아오는 API




  // 상세 정보가 로딩 중인 경우 로딩 표시
  if (!voiceDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.UseVoiceDetailContainer}>
      <SideBar />
      <div className={styles.content}>
        {/* 좌측에는 사용자 정보를 간단히 보여줄거임 */}
        <div className={styles.left}>
          <div>
            {/* <img className={styles.pimg} src={voiceDetail.productImageUrl} alt={voiceDetail.productTitle} /> */}
            <div className={styles.title}>{voiceDetail.productTitle}</div>
            <div className={styles.summary}>{voiceDetail.summary}</div>

            <div className={styles.remain}> <RxDot/> <span>사용 가능</span>한 글자 수 : <span>{voiceDetail.remainLetter}</span>자 </div>
            <div className={styles.total}> <RxDot/>  <span>구매</span>한 총 글자 수 :<span>{voiceDetail.totalCount}</span>자</div>
            <div className={styles.alert}>한 번에 최대 200자까지만 사용 가능합니다.</div>

          </div>
          <Link to="/use-voice">
            <div className={styles.select}>
              AI 목소리 선택
            </div>
          </Link>
        </div>

        <hr />

        {/* 우측에는 text 창이랑 사용 history 함께 보여줄거임 */}
        <div className={styles.right}>
          {/* text창 */}
          <div className={styles.inputContainer}>
          <div className={styles.textBox}>
          </div>
          <div className={styles.textcontain}>
            
            <textarea
              value={text}
              onChange={handleTextChange}
              maxLength={mL}
              placeholder="사용하실 텍스트를 입력하세요"
              className={styles.textarea}
            />
            <div className={styles.button}>
              <VscSend />
            </div>
          </div>
            <div className={styles.characterCount}>{text.length}자 / 200자</div>
            <div></div>
          </div>

          <hr className={styles.hr} />

          {/* history */}
          <div>
            <UseList transactionid={voiceDetail.transactionId.toString()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseVoiceDetail;
