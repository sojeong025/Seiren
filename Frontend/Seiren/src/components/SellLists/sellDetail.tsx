import { useEffect, useState } from "react";
import { customAxios } from "../../libs/axios";
import { useParams } from "react-router-dom";
import styles from "./SellDetail.module.css";
import SellDetailList from "./SellDetailList";


interface Product {
  productTitle: string;
  productImageUrl: string;
  productCategoryList: string[];
  summary: string;
  nickname: string;
}

function SellDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  
  console.log(productId);
  useEffect(() => {
    customAxios
      .get(`product/${productId}`)
      .then(response => {
        let useProduct = response.data.response;
        console.log(useProduct);
        setProduct(useProduct);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, [productId]);

  return (
    <div className={styles.sellDetailContainer}>
      <div>
        <h1>{product.productTitle}</h1>
        <div >
          <img src={product.productImageUrl} alt={product.productTitle} className={styles.pimg} />
        </div>
        <p>Product Category: {product.productCategoryList}</p>
        <p>Summary: {product.summary}</p>
        <p>Nickname: {product.nickname}</p>
      </div>
      <div>
        <SellDetailList productId={productId} />
      </div>
    </div>
  );
}

export default SellDetail;
