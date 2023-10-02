import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { customAxios } from '../../libs/axios';
import { Link } from 'react-router-dom';
import styles from './ProductDetailPage.module.css';
import { BsHeartFill, BsHeart} from "react-icons/bs"
import AWS, { AlexaForBusiness } from "aws-sdk";
import axios from 'axios';




function ProductDetailPage() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [testText, setTestText] = useState("");

  const colors = ['#e9defa', '#d9afd9', '#abecd6']; 

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

  const accessToken = localStorage.getItem("accessToken");
  const marketProduct = async (text) => {
    let response = await axios.get(`http://70.12.130.121:1470/synthesize3?voice_id=18&product_id=20&text=${text}`,{
      responseType: 'blob',
      headers: {
        'Authorization' : `Bearer ${accessToken}`
      }
    });
    console.log(response.data);

    const blobUrl = URL.createObjectURL(response.data);

    let audio = new Audio(blobUrl);
    audio.play();
  };

  return (
    <div className={styles.total}>
      <div className={styles.product}>
        {productDetail && (
          <div className={styles.product_left}>
            <div className={styles.nickname}>{productDetail.nickname}</div>
            <img src={productDetail.productImageUrl} alt={productDetail.productTitle} className={styles.img}/>
            <div className={styles.title}>{productDetail.productTitle}</div>
            <div className={styles.summary}>{productDetail.summary}</div>
            {productDetail.productCategoryList && (
              <div className={styles.categories}>
                {productDetail.productCategoryList.map((category, index) => (
                  <div 
                    key={index}
                    style={{ backgroundColor: colors[index % colors.length] }}
                    className={styles.category}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className={styles.product_right}>
          <div className={styles.listen}>
              <div>들어볼 문장 1</div>
              <div>들어볼 문장 2</div>
              <div>들어볼 문장 3</div>
          </div>

          <div className={styles.test}>
            <div className={styles.text_txt}>TEST</div>
            <textarea name="test" id="test" cols={30} rows={10} 
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            style={{ resize: 'none' }} placeholder='듣고 싶은 내용을 입력하고 재생 버튼을 클릭하세요.'></textarea>
            <button onClick={() => marketProduct(testText)}>들어보기</button>
          </div>

          <div className={styles.btn}>
            <div className={styles.table}>가격표 보기</div>
            <Link to="/purchase">
              <div className={styles.buy}>구매 하기</div>
            </Link>
            <div className={styles.wish} onClick={handleLikeClick}>
              {isLiked ? <BsHeart/> : <BsHeartFill/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
