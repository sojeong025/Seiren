import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { likeListState } from "../../recoil/UserAtom";
import { customAxios } from "../../libs/axios";
import styles from "./Likes.module.css";

function Likes() {
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
    <div className={styles.LikesContainer}>
      <div className={styles.likesText}>Likes</div>
      <ul className={styles.likesItems}>
        {wishList.map(item => (
          <li key={item.productId}>
            <div>{item.title}</div>
            <div>{item.price}</div>
            <img className={styles.pimg} src={item.productImageUrl} alt={item.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Likes;
