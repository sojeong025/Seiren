import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { likeListState } from "../../recoil/UserAtom";
import { customAxios } from "../../libs/axios";
import styles from "./FavoriteVoice.module.css";

interface Voice {
  id: number;
  avatar: string;
  title: string;
  seller: string;
  category: string;
}

function FavoriteVoice() {
  const [wishList, setWishList] = useRecoilState(likeListState);

  useEffect(() => {
    customAxios
      .get("wish") // 원하는 API 경로로 변경하세요.
      .then(response => {
        const responseData = response.data;
        const likeslist = responseData && responseData.response.wishList ? responseData.response.wishList : [];
        // API 응답 데이터를 Recoil 상태에 설정
        setWishList(likeslist);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [setWishList]);

  return (
    <div className={styles.container}>
      <div className={styles.FavText}>좋아요 누른 목소리나 캐러샐을 통한 광고 느낌</div>
      <div className={styles.cards}>
        {wishList.map(item => (
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
