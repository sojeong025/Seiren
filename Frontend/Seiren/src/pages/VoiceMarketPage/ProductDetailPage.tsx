import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { customAxios } from '../../libs/axios';
import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    // productId를 이용해 해당 상품 정보를 가져옵니다.
    customAxios
      .get(`product/${productId}`)
      .then((response) => {
        const responseData = response.data.response;

        // 받아온 상품 정보를 상태에 저장합니다.
        setProductDetail(responseData);

        console.log(responseData);
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, [productId]);

  return (
    <div className={styles.total}>
      <h1>목소리 디테일 페이지</h1>
      {/* productDetail이 있을 때만 화면에 표시합니다. */}
      {productDetail && (
        <div>
          <h2>{productDetail.productTitle}</h2>
          <img src={productDetail.productImageUrl} alt={productDetail.productTitle} className={styles.img}/>
          <p>{productDetail.summary}</p>
          <p>Nickname: {productDetail.nickname}</p>
          <p>카테고리: {productDetail.productCategoryList.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
