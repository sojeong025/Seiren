import React from "react";
import styles from "./DetailPage.module.css";
import { useParams } from "react-router-dom";

interface RouteParams {
  index: string;
}

const DetailPage: React.FC = () => {
  const { index } = useParams<RouteParams>();

  const likedItems = ["노래 제목 1", "노래 제목 2", "노래 제목 3"];
  const selectedItem = likedItems[parseInt(index, 10)];

  return (
    <div className="detail-container">
      <h1>Detail Page</h1>
      <h2>선택한 아이템: {selectedItem}</h2>
      <img src={`아이템 이미지 경로 ${index}`} alt={`아이템 이미지 ${index}`} />
      <p>아이템에 대한 설명이나 추가 내용을 여기에 추가하세요.</p>
      <button>구매하기</button>
    </div>
  );
};

export default DetailPage;
