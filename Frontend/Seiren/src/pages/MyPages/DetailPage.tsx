import React, { useState, useEffect } from "react";
import styles from "./DetailPage.module.css";
import { useParams } from "react-router-dom";
import axios from "axios"; // axios import

interface RouteParams {
  index: string;
}

const DetailPage: React.FC = () => {
  const { index } = useParams<RouteParams>();
  const [productData, setProductData] = useState<any>(null); // API 응답 데이터를 저장할 상태

  useEffect(() => {
    // Access Token을 여기에 설정
    const accessToken = localStorage.getItem("accessToken");
    // API 호출을 수행하는 함수
    async function fetchProductData() {
      try {
        const response = await axios.get(`http://192.168.40.134:8080/api/product/${index}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Access Token을 헤더에 추가
          },
        });
        console.log(response)
        
        if (!response.data.success) {
          throw new Error("API 호출 중 문제 발생");
        }
        
        setProductData(response.data.response);
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    }

    fetchProductData();
  }, [index]); // index 파라미터가 변경될 때마다 API 호출

  if (!productData) {
    // API 데이터가 로드되지 않은 경우 로딩 상태를 보여줌
    return <div>Loading...</div>;
  }

  // API 데이터를 사용하여 페이지를 렌더링
  return (
    <div className={styles["detail-container"]}>
      <h1>Detail Page</h1>
      <h2>상품 제목: {productData.productTitle}</h2>
      <img src={productData.productImageUrl} alt={`상품 이미지 ${index}`} />
      <p>요약: {productData.summary}</p>
      <p>닉네임: {productData.nickname}</p>
      <p>카테고리: {productData.productCategoryList.join(", ")}</p>
    </div>
  );
};

export default DetailPage;
