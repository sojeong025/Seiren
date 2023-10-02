import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { customAxios } from "../../libs/axios";
import styles from "./FavoriteVoice.module.css";

interface Voice {
  productId: number;
  productImageUrl: string;
  title: string;
  // 기타 필요한 속성들을 여기에 추가하세요
}

function shuffleArray(array: Voice[]) {
  // 배열을 무작위로 섞는 함수
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function FavoriteVoice() {
  const [List, setList] = useState<Voice[]>([]);

  useEffect(() => {
    const fetchAllPages = async () => {
      const allVoices: Voice[] = [];

      for (let page = 1; page <= 5; page++) {
        try {
          const response = await customAxios.get(`productList?page=1`);
          const voices = response.data.response;
          allVoices.push(...voices);
        } catch (error) {
          console.error("API 호출 중 오류 발생:", error);
          break; // 오류 발생 시 반복 중단
        }
      }

      const shuffledVoices = shuffleArray(allVoices);
      const selectedVoices = shuffledVoices.slice(0, 5);
      setList(selectedVoices);
    };

    fetchAllPages();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.FavText}>좋아요 누른 목소리나 캐러샐을 통한 광고 느낌</div>
      <div className={styles.cards}>
        {List.map((item) => (
          <div key={item.productId} className={styles.item}>
            <Link to={`/product/${item.productId}`}>
              <div className={styles.card}>
                <img className={styles.pimg} src={item.productImageUrl} alt={item.title} />
                <div className={styles.title}>{item.title}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteVoice;
