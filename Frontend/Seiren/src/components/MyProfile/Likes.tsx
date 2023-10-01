import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { likeListState } from "../../recoil/UserAtom";
import { customAxios } from "../../libs/axios";
import styles from "./Likes.module.css";

function Likes() {
  const [wishList, setWishList] = useRecoilState(likeListState);

  useEffect(() => {
    customAxios
      .get("wish") 
      .then(response => {
        const responseData = response.data;
        const likeslist = responseData && responseData.response.wishList ? responseData.response.wishList : [];
        setWishList(likeslist);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [setWishList]);

  return (
    <div className={styles.LikesContainer}>
      <div className={styles.likesText}>관심 있는 목소리</div>
      <div className={styles.likesItems}>
        {wishList.map(item => (
          <div key={item.productId} className={styles.item}>
            <Link to={`/product/${item.productId}`}>
            <div className={styles.card}>
              <img className={styles.pimg} src={item.productImageUrl} alt={item.title} />
              <div className={styles.titleOverlay}>
                <div className={styles.title}>{item.title}</div>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Likes;
