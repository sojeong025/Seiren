import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAxios } from "../../libs/axios";

interface PurchaseProps {
  productId: string;
}

function Purchase({ productId }: PurchaseProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyLetterCount, setBuyLetterCount] = useState("");
  const [purposeId, setPurposeId] = useState("");
  const [purchaseResponse, setPurchaseResponse] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePurchase = () => {
    // buyLetterCount와 purposeId를 사용하여 구매 요청을 보냅니다.
    customAxios
      .post("purchase", {
        productId: Number(productId),
        buyLetterCount: Number(buyLetterCount),
        purposeId: Number(purposeId)
      })
      .then((response) => {
        console.log(response);
        setPurchaseResponse(response.data);
        handleCloseModal(); // 구매 성공 시 모달을 닫습니다.
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  };

  return (
    <div>
      <button onClick={handleOpenModal}>구매하기</button>

      {isModalOpen && (
        <div className="modal">
          <h2>구매 정보 입력</h2>
          <label>
            Letter 수량:
            <input
              type="number"
              value={buyLetterCount}
              onChange={(e) => setBuyLetterCount(e.target.value)}
            />
          </label>
          <label>
            Purpose ID:
            <input
              type="number"
              value={purposeId}
              onChange={(e) => setPurposeId(e.target.value)}
            />
          </label>
          <button onClick={handlePurchase}>구매하기</button>
          <button onClick={handleCloseModal}>닫기</button>
        </div>
      )}

      {purchaseResponse ? (
        <div>
          <p>구매가 성공적으로 완료되었습니다.</p>
        </div>
      ) : (
        <p>구매가능합니다!</p>
      )}
    </div>
  );
}

export default Purchase;
