import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { likeListState } from '../../recoil/UserAtom';
import { customAxios } from '../../libs/axios';
import styles from './Likes.module.css';

function Likes() {
  const [wishList, setWishList] = useRecoilState(likeListState);

  useEffect(() => {
    customAxios.get("wish")
      .then((response) => {
        setWishList(response.data.response.wishList);
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, []);

  return (
    <div className={styles.LikesContainer}>
      <div className={styles.likesText}>Likes</div>
      <ul>
        {wishList.map((item) => (
          <li key={item.productId}>
            <div>{item.title}</div>
            <div>{item.price}</div>
            <img src={item.productImageUrl} alt={item.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Likes;
