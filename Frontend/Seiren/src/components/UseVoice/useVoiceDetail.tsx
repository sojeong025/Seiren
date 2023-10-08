import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { customAxios } from "../../libs/axios";
import styles from "./UseVoiceDetail.module.css";
import SideBar from "../common/SideBar";
import UseList from "./UseList";
import { RxDot } from "react-icons/rx";
import { VscSend } from "react-icons/vsc";
import axios from "axios";

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
  const [checkSend, setCheckSend] = useState(false);

  const handleTextChange = event => {
    setText(event.target.value);
    setTextLength(event.target.value.length);
  };

  // 목소리 (상품) 상세 정보 GET
  useEffect(() => {
    customAxios
      .get(`transactions/detail/${productId}`)
      .then(response => {
        const voiceDetailData = response.data.response;
        // console.log("상품 상세정보 api ", response);

        setVoiceDetail(voiceDetailData);
        // console.log("보이스 아이디", voiceDetailData.voiceId);
        // console.log("트렌젝션아이디", voiceDetailData.transactionId);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [productId, checkSend]);

  // 사용 TEXT 서버에 전송 API
  const accessToken = localStorage.getItem("accessToken");
  const marketProduct = async text => {
    // console.log(text);
    let response = await axios.get(
      `https://j9e105.p.ssafy.io/ai2/synthesize2?voice_id=${voiceDetail.voiceId}&transaction_id=${voiceDetail.transactionId}&text=${text}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    // console.log(response.data);
    // const blobUrl = URL.createObjectURL(response.data);
    // let audio = new Audio(blobUrl);
    if (checkSend === false) {
      setCheckSend(true);
    } else {
      setCheckSend(false);
    }
  };

  // 차감 글자 수

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

            <div className={styles.remain}>
              {" "}
              <RxDot /> <span>사용 가능</span>한 글자 수 : <span>{voiceDetail.remainLetter}</span>자{" "}
            </div>
            <div className={styles.total}>
              {" "}
              <RxDot /> <span>구매</span>한 총 글자 수 :<span>{voiceDetail.totalCount}</span>자
            </div>
            <div className={styles.alert}>한 번에 최대 200자까지만 사용 가능합니다.</div>
          </div>
          <Link to="/use-voice">
            <div className={styles.select}>AI 목소리 선택</div>
          </Link>
        </div>

        <hr />

        {/* 우측에는 text 창이랑 사용 history 함께 보여줄거임 */}
        <div className={styles.right}>
          {/* text창 */}
          <div className={styles.inputContainer}>
            <div className={styles.textBox}></div>
            <div className={styles.textcontain}>
              <textarea
                value={text}
                onChange={handleTextChange}
                maxLength={mL}
                placeholder="사용하실 텍스트를 입력하세요"
                className={styles.textarea}
              />
              <div onClick={() => marketProduct(text)} className={styles.button}>
                <VscSend />
              </div>
            </div>
            <div className={styles.characterCount}>{text.length}자 / 200자</div>
            <div></div>
          </div>

          <hr className={styles.hr} />

          {/* history */}
          <div className={styles.scroll}>
            <UseList transactionid={voiceDetail.transactionId.toString()} checkSend={checkSend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseVoiceDetail;
