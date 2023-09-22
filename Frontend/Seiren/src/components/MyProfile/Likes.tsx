import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { likeListState } from '../../recoil/UserAtom';
import { customAxios } from '../../libs/axios';
import styles from './Likes.module.css';

function Likes() {
  const [wishList, setWishList] = useRecoilState(likeListState);
    // 더미 데이터 설정
    // const wishList = [
    //   {
    //     "productId": 1,
    //     "title": "제목1",
    //     "summary": "요약1",
    //     "productImageUrl": "/path/to/image1.jpg",
    //     "price": 12000,
    //     "productCategoryList": [
    //       {
    //         "categoryId": 5,
    //         "categoryName": "경직된"
    //       },
    //       {
    //         "categoryId": 10,
    //         "categoryName": "청년"
    //       }
    //     ]
    //   },
    //   {
    //     "productId": 2,
    //     "title": "제목2",
    //     'summary': '요약2',
    //     'productImageUrl': '/path/to/image2.jpg',
    //     'price': 14000,
    //     'productCategoryList': [
    //       {
    //         'categoryId': 6,
    //         'categoryName': '활발한'
    //       },
    //       {
    //         'categoryId': 8,
    //         'categoryName': '유아'
    //       }
    //     ]
    //   }
    // ];

    // setWishList(dummyData);

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
