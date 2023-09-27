import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { customAxios } from "../../libs/axios";
import styles from "./UseVoiceDetail.module.css";
import SideBar from "../../components/common/SideBar";
import UseList from "../UseVoice/UseList";

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

  useEffect(() => {
    customAxios
      .get(`transactions/detail/${productId}`)
      .then(response => {
        const voiceDetailData = response.data.response;

        setVoiceDetail(voiceDetailData);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [productId]);

  const sendPostRequest = () => {
    const requestData = {
      transactionId: 0,
      text: text, // 페이지에서 입력한 텍스트를 사용
    };

    customAxios
      .post("transactions", requestData)
      .then(response => {
        console.log("POST 요청 성공:", response.data);
      })
      .catch(error => {
        console.error("POST 요청 중 오류 발생:", error);
      });
  };

  const handleTextChange = event => {
    setText(event.target.value);
  };

  // 상세 정보가 로딩 중인 경우 로딩 표시
  if (!voiceDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.UseVoiceDetailContainer}>
      <SideBar />
      <div className={styles.content}>
        <div className={styles.upSide}>
          <div>
            <img className={styles.pimg} src={voiceDetail.productImageUrl} alt={voiceDetail.productTitle} />
          </div>
          <div className={styles.texts}>
            <div className={styles.title}>{voiceDetail.productTitle}</div>
            {voiceDetail.productCategories && voiceDetail.productCategories.length > 0 && (
              <div className={styles.mood}>
                {voiceDetail.productCategories.map(category => `#${category}`).join(", ")}
              </div>
            )}

            <div className={styles.summary}>{voiceDetail.summary}</div>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.textBox}>
            <div className={styles.inputTitle}>Text Input</div>
            <div>
              {voiceDetail.remainLetter} / {voiceDetail.totalCount}
            </div>
          </div>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="텍스트를 입력하세요"
            className={styles.input}
          />
          <div className={styles.characterCount}>{text.length} 글자</div> {/* 글자 수 표시 */}
          <button onClick={sendPostRequest} className={styles.button}>
            SEND
          </button>
        </div>

        <UseList transactionid={voiceDetail.transactionId.toString()} />
      </div>
    </div>
  );
};

export default UseVoiceDetail;
