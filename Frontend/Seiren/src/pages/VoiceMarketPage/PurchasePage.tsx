import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate와 useParams 추가
import { customAxios } from "../../libs/axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

interface PurposeGet {
  id: number;
  purposeName: string;
}

function PurchasePage() {
  const { productId, price } = useParams(); // 경로 매개변수에서 productId 가져오기
  const [buyLetterCount, setBuyLetterCount] = useState("");
  const [purposeId, setPurposeId] = useState("");
  const [purchaseResponse, setPurchaseResponse] = useState(null);
  const [purposeList, setPurposeList] = useState<PurposeGet[]>();
  const navigate = useNavigate(); // useNavigate 훅 추가

  useEffect(() => {
    customAxios.get("purposes")
      .then((res) => {
        console.log(res.data.response);
        setPurposeList(res.data.response);
      })
  }, []);

  const handlePurpose = (e: SelectChangeEvent) => {
    setPurposeId(e.target.value);
  }

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
        navigate("/"); // 구매 성공 후 메인 페이지로 이동
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  };

  return (
    <div>
      <label>
        Letter 수량:
        <input
          type="number"
          value={buyLetterCount}
          onChange={(e) => setBuyLetterCount(e.target.value)}
        />
      </label>

      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">구매 목적</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={purposeId}
            onChange={handlePurpose}
            label="purpose"
          >
            {
              purposeList && purposeList.map((data, i) =>
                <MenuItem key={i} value={data.id}>{data.purposeName}</MenuItem>
              )
            }
          </Select>
        </FormControl>
      </div>
      <p>가격: {price} 원</p>
      <button onClick={handlePurchase}>구매하기</button>

      {purchaseResponse ? (
        <div>
          <p>구매가 성공적으로 완료되었습니다.</p>
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default PurchasePage;
