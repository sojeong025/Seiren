import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { customAxios } from '../../libs/axios';
import Purchase from '../../components/Purchase/Purchase';
import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    customAxios
      .get(`product/${productId}`)
      .then((response) => {
        const responseData = response.data.response;
        console.log(responseData)
        setProductDetail(responseData);
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, [productId]);

  const handleLikeClick = () => {
    if (isLiked) {
      customAxios
        .delete(`wish/${productId}`)
        .then((response) => {
          console.log(response.data);
          setIsLiked(false);
        })
        .catch((error) => {
          console.error('API 호출 중 오류 발생:', error);
        });
    } else {
      customAxios
        .post(`wish/${productId}`)
        .then((response) => {
          console.log(response.data);
          setIsLiked(true);
        })
        .catch((error) => {
          console.error('API 호출 중 오류 발생:', error);
        });
    }
  };

  return (
    <div className={styles.total}>
      <h1>목소리 디테일 페이지</h1>
      {productDetail && (
        <div>
          <h2>{productDetail.productTitle}</h2>
          <img src={productDetail.productImageUrl} alt={productDetail.productTitle} className={styles.img}/>
          <p>{productDetail.summary}</p>
          <p>Nickname: {productDetail.nickname}</p>
          <p>카테고리: {productDetail.productCategoryList.join(', ')}</p>
          <p>가격 : 글자 당 [ {productDetail.price} ] 원</p>
          <button onClick={handleLikeClick}>
            {isLiked ? '좋아요 취소' : '좋아요'}
          </button>
          <Purchase productId={productId} />
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
