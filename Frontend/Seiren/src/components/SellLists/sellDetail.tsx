import { useEffect, useState } from "react";
import { customAxios } from "../../libs/axios";
import { useParams } from "react-router-dom";
import styles from "./SellDetail.module.css";
import SellDetailList from "./SellDetailList";
import UploadImgOri from "../common/UploadImgOri";
import SideBar from "../../components/common/SideBar";

interface Product {
  productId: string;
  productTitle: string;
  productImageUrl: string;
  productCategoryList: string[];
  summary: string;
  nickname: string;
  price: number;
}
interface SellDetailProps {
  setIsNavBarVisible: (value: boolean) => void; // setIsNavBarVisible 프로퍼티 추가
}

const SellDetail: React.FC<{ setIsNavBarVisible: (visible: boolean) => void }> = ({ setIsNavBarVisible }) => {
  useEffect(() => {
    setIsNavBarVisible(false);

    return () => {
      setIsNavBarVisible(true);
    };
  }, [setIsNavBarVisible]);

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
    setIsNavBarVisible(false); // setIsNavBarVisible 사용
    return () => {
      setIsNavBarVisible(true); // 컴포넌트 언마운트 시 다시 설정
    };
  }, [setIsNavBarVisible]);
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
      <SideBar />
      <div className={styles.big}>
        <div className={styles.container}>
          <div className={styles.left}>
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
          <div className={styles.mid}>
            <div className={styles.title}>
              {isEditing ? (
                <input className={styles.edittitle} type="text" value={productTitle} onChange={e => setProductTitle(e.target.value)} />
              ) : (
                product.productTitle
              )}
            </div>
            <p className={styles.mood}>#{product.productCategoryList.join(", #")}</p>
            <p className={styles.summary}>
              {" "}
              {isEditing ? (
                <input className={styles.editsummary} type="text" value={summary} onChange={e => setSummary(e.target.value)} />
              ) : (
                product.summary
              )}
            </p>
          </div>
          <div className={styles.right}>
            <div className={styles.price}>
              <span className={styles.pricetxt}>
              {isEditing ? (
                <input className={styles.editprice} type="number" value={price} onChange={e => setPrice(e.target.value)} />
              ) : (
                product.price
              )}
              </span> <span className={styles.one}>원</span>
              
              <span className={styles.txt}> (단위 : 자)</span>
              
            </div>
            <div className={styles.btn}>
              {isEditing && <button onClick={handleSaveClick}>저장</button>}
              {!isEditing && <button onClick={handleEditClick}>수정</button>}
            </div>
          </div>
        </div>
        <div>
          <SellDetailList productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default SellDetail;
