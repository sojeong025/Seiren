import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate와 useParams 추가
import { customAxios } from "../../libs/axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import styles from "./PurchasePage.module.css"
import { AiOutlineUser } from "react-icons/ai"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

interface PurposeGet {
  id: number;
  purposeName: string;
}

function PurchasePage() {
  const { productId } = useParams();
  const [buyLetterCount, setBuyLetterCount] = useState(100);
  const [purposeId, setPurposeId] = useState("");
  const [purchaseResponse, setPurchaseResponse] = useState(null);
  const [purposeList, setPurposeList] = useState<PurposeGet[]>();
  const [productDetail, setProductDetail] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [letterOptions, setLetterOptions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(100);
  
  const navigate = useNavigate();

  useEffect(() => {
    customAxios
      .get(`product/${productId}`)
      .then((response) => {
        const responseData = response.data.response;
        console.log('상품정보 가져오자',responseData);
        setProductDetail(responseData); 
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, [productId]);

  useEffect(() => {
    customAxios.get("purposes")
      .then((res) => {
        console.log(res.data.response);
        setPurposeList(res.data.response);
      })
  }, []);

  useEffect(() => {
    if (productDetail) {
      setTotalPrice(productDetail.price * buyLetterCount);
    }
  }, [buyLetterCount, productDetail]);

  useEffect(() => {
    if (productDetail) {
      setLetterOptions([
        { letters: 100, price: productDetail.price * 100 },
        { letters: 300, price: productDetail.price * 300 },
        { letters: 700, price: productDetail.price * 700 },
        { letters: 1000, price: productDetail.price * 1000 }
      ]);
    }
  }, [productDetail]);

  const handlePurpose = (e: SelectChangeEvent) => {
    setPurposeId(e.target.value);
  }

  const handlePurchase = () => {
    customAxios
      .post("purchase", {
        productId: Number(productId),
        buyLetterCount: Number(buyLetterCount),
        purposeId: Number(purposeId)
      })
      .then((response) => {
        console.log(response);
        setPurchaseResponse(response.data);
        navigate("/use-voice");
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  };

  return (
    <div className={styles.total}>
      <div className={styles.mainTxt}>
        결제하기
      </div>
      <div className={styles.container}>
        {/* 좌측 */}
        <div className={styles.left}>
          <div className={styles.purchase}>주문 내역</div>
          
          {/* 상품 요약 */}
          { productDetail && (
            <div className={styles.intro}>
              <img src={productDetail.productImageUrl} alt={productDetail.productTitle} className={styles.img}/>
              <div>
                <div className={styles.title}>{productDetail.productTitle}</div>
                <div className={styles.nickname}><AiOutlineUser/> {productDetail.nickname}</div>
              </div>
            </div>
          )}

          
          {/* 가격 선택 */}
          <div className={styles.payments}>
            <div>가격 항목</div>
            <hr />
            <div className={styles.pay}>
              {letterOptions.map((option) => (
                <div 
                  key={option.letters} 
                  className={`${styles.card} ${selectedCard === option.letters ? styles['selected'] : ''}`}
                  onClick={() => {
                    setBuyLetterCount(option.letters);
                    setSelectedCard(option.letters);
                  }}
                >
                  <div className={styles.bold}>{option.letters}자</div>
                  <div>가격 : {option.price}원</div>
                </div>
              ))}
            </div>
          </div>

          {/* 구매 목적 */}
          <div className={styles.reason}>
          <div>구매 목적</div>
          <hr />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">선택해주세요.</InputLabel>
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
        </div>


        {/* 우측 */}
        <div className={styles.right}>
          <div className={styles.dummy}>
            <div>주문 금액</div>
            <div>{totalPrice}원</div>
          </div>

          <div className={styles.dummy}>
            <div>쿠폰 할인</div>
            <div>0원</div>
          </div>

          <div className={styles.dummy}>
            <div>세이렌 포인트</div>
            <div>0원</div>
          </div>

          <hr />
          <div className={styles.dummy}>
            <div className={styles.finish}>총 결제 금액</div>
            <div className={styles.finish}>{totalPrice}원</div>
          </div>

          <div className={styles.rule}>
            <div>결제 전 안내사항</div>
            <div><MdOutlineKeyboardArrowDown/></div>
          </div>

          <div className={styles.rule}>
            <div>개인정보 제3자 제공</div>
            <div><MdOutlineKeyboardArrowDown/></div>
          </div>

          <div className={styles.rule2}>위 내용을 확인하였고, 결제에 동의합니다.</div>


          <div className={styles.btn} onClick={handlePurchase}>결제하기</div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
