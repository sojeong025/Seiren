  import React, { useState, useEffect } from "react";
  import styles from "./DetailPage.module.css";
  import { customAxios } from "../../libs/axios";
  import { useParams } from "react-router-dom";
  import axios from "axios"; // axios import

  interface RouteParams {
    index: string;
  }

  const DetailPage: React.FC = () => {
    const { index } = useParams<RouteParams>();
    const [productData, setProductData] = useState<any>(null); // API 응답 데이터를 저장할 상태

    useEffect(() => {
      customAxios
        .get('transactions/detail/' + index) // 원하는 API 경로로 변경하세요.
        .then(response => {
          const responseData = response.data;
          console.log(responseData)
          setProductData(responseData);
        })
        .catch(error => {
          console.error("API 호출 중 오류 발생:", error);
        });
    }, [setProductData]);

    
    return (
      <div className={styles.detailContainer}>
        {/* <h1>Detail Page</h1>
        <h2>상품 제목: {productData.productTitle}</h2>
        <img src={productData.productImageUrl} alt={`상품 이미지 ${index}`} />
        <p>요약: {productData.summary}</p>
        <p>닉네임: {productData.nickname}</p>
        <p>카테고리: {productData.productCategoryList.join(", ")}</p> */}
      </div>
    );
  };

  export default DetailPage;
