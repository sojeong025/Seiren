import { useEffect, useState } from "react";
import { customAxios } from "../../libs/axios";
import { useParams } from "react-router-dom";
import styles from "./SellDetail.module.css";
import SellDetailList from "./SellDetailList";
import UploadImgOri from "../common/UploadImgOri";

interface Product {
  productId: string;
  productTitle: string;
  productImageUrl: string;
  productCategoryList: string[];
  summary: string;
  nickname: string;
  price: number;
}

function SellDetail() {
  const { productId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [productTitle, setProductTitle] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState<Product>({
    productId: "",
    productTitle: "",
    productImageUrl: "",
    productCategoryList: [], // 초기값으로 빈 배열 설정
    summary: "",
    nickname: "",
    price: 0,
  });
  useEffect(() => {
    customAxios
      .get(`product/${productId}`)
      .then(response => {
        let useProduct = response.data.response;
        setProduct(useProduct);
        setProductImageUrl(useProduct.productImageUrl);
        setSummary(useProduct.summary);
        setPrice(useProduct.price);
        setProductTitle(useProduct.productTitle);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, [productId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedData = {
      productId: productId,
      productTitle: productTitle,
      summary: summary,
      productImageUrl: productImageUrl,
      price: Number(price),
    };

    customAxios
      .put(`product`, updatedData)
      .then(response => {
        setIsEditing(false);
        setProduct(prevState => ({
          ...prevState,
          productTitle: updatedData.productTitle,
          summary: updatedData.summary,
          productImageUrl: updatedData.productImageUrl,
          price: updatedData.price,
        }));
        console.log(response);
      })
      .catch(error => {
        console.error("수정 중 오류 발생:", error);
      });
  };

  return (
    <div className={styles.sellDetailContainer}>
      <div>
        <h1>
          {isEditing ? (
            <input type="text" value={productTitle} onChange={e => setProductTitle(e.target.value)} />
          ) : (
            product.productTitle
          )}
        </h1>
        <div>
          {isEditing ? (
            <>
              <UploadImgOri imgUrl={productImageUrl} setImgUrl={setProductImageUrl} />
            </>
          ) : (
            <>
              <img src={productImageUrl} alt={product.productTitle} className={styles.pimg} />
            </>
          )}
        </div>

        <p>Product Category: {product.productCategoryList.join(", ")}</p>
        <p>
          Summary:{" "}
          {isEditing ? (
            <input type="text" value={summary} onChange={e => setSummary(e.target.value)} />
          ) : (
            product.summary
          )}
        </p>
        <p>
          price:{" "}
          {isEditing ? <input type="number" value={price} onChange={e => setPrice(e.target.value)} /> : product.price}
        </p>
        {isEditing && <button onClick={handleSaveClick}>저장</button>}
        {!isEditing && <button onClick={handleEditClick}>수정</button>}
      </div>
      <div>
        <SellDetailList productId={productId} />
      </div>
    </div>
  );
}

export default SellDetail;
