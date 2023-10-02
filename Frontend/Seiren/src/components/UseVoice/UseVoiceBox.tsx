import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { customAxios } from "../../libs/axios";
import styles from "./UseVoiceBox.module.css";
import VoiceItem from "./VoiceItem";
import Pagination from "../common/Pagination"; // Pagination 컴포넌트 추가
import { BiSolidSelectMultiple } from "react-icons/bi" 
import { FaKeyboard } from "react-icons/fa"
import { MdLibraryMusic } from "react-icons/md"


function UseVoiceBox() {
  const [useVoiceList, setUseVoiceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [ableCount, setAbleCount] = useState();
  const [unableCount, setUnableCount] = useState();
  const itemsPerPage = 10;

  useEffect(() => {
    customAxios
      .get(`transactions/availability`)
      .then(response => {
        const able = response.data.response.useAbleCount;
        const unable = response.data.response.useUnableCount;
        setAbleCount(able);
        setUnableCount(unable);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, []);

  useEffect(() => {
    customAxios
      .get(`transactions?page=${currentPage}`)
      .then(response => {
        let voiceData = response.data.response;
        setUseVoiceList(voiceData);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, [currentPage]);

  const onPageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.UseVoiceContainer}>
      <div className={styles.top}>
        <div className={styles.top_left}>
          <div>
            개성 있는 <span>AI 보이스</span>를 사용하여<br/>
            나만의 <span>음성 콘텐츠</span>를 제작해 보세요!
          </div>
        </div>
        <div className={styles.top_right}>
          <div className={styles.question}>오디오 콘텐츠를 <br/>
              처음 제작하시나요?
          </div>
          <div> 쉽고 간단한 제작과정을 확인해보세요</div>
          <div className={styles.icons}>
            <div>
              <div className={styles.icon}><BiSolidSelectMultiple/></div>
              <div className={styles.icon_txt}>AI 보이스 선택</div>
            </div>
            <div>
              <div className={styles.icon}><FaKeyboard/></div>
              <div className={styles.icon_txt}>스크립트 작성</div>
            </div>
            <div>
              <div className={styles.icon}><MdLibraryMusic/></div>
              <div className={styles.icon_txt}>음원 파일 확인</div>
            </div>
          </div>
        </div>

      </div>

      <div className={styles.voiceItems}>
        {useVoiceList.map(item => (
          <Link to={`/voice-detail/${item.productId}`} key={item.productId}>
            <VoiceItem
              key={item.productId}
              productImageUrl={item.productImageUrl}
              productTitle={item.productTitle}
              remainCount={item.remainLetter}
              totalCount={item.totalCount}
              productCategories={item.productCategories}
            />
          </Link>
        ))}
      </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalAmount={ableCount}
        />
    </div>
  );
}

export default UseVoiceBox;
