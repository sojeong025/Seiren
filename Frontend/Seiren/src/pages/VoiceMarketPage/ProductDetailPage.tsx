import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { customAxios } from '../../libs/axios';
import { Link } from 'react-router-dom';
import styles from './ProductDetailPage.module.css';
import { BsHeartFill, BsHeart, Bs1CircleFill, Bs2CircleFill, Bs3CircleFill
        , Bs1Circle, Bs2Circle, Bs3Circle, BsFillPlayCircleFill, BsMusicNoteList} from "react-icons/bs"
import axios from 'axios';
import dreamsAudio from "../../assets/audio/dreams.mp3";


function ProductDetailPage() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [testText, setTestText] = useState("");
  const [useCount, setUseCount] = useState(0);
  const mL = 20;
  const [checkPre, setCheckPre] = useState(false);
  const [audio1, setAudio1] = useState();
  const [audio2, setAudio2] = useState();
  const [audio3, setAudio3] = useState();

  const colors = ['#FFD1DC', '#B2FEBD', '#C5A3FF']; 

  useEffect(() => {
    customAxios.get(`preview/${productId}`)
      .then((res) => {
        console.log('미리듣기 음성파일 url 받아오기', res)
        // setAudio1(res.data.response.previewUrls.0)
      })
      .catch((err) => console.log(err));

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

    customAxios.get(`tts/count/${productId}`)
    .then((res)=>{
      console.log(res);
      setUseCount(res.data.response);
    })
  }, [productId, checkPre]);

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
    let response = await axios.get(`http://70.12.130.121:1470/synthesize3?voice_id=${productDetail.voiceId}&product_id=${productId}&text=${text}`,{
      responseType: 'blob',
      headers: {
        'Authorization' : `Bearer ${accessToken}`
      }
    });
    console.log(response.data);

    const blobUrl = URL.createObjectURL(response.data);

    let audio = new Audio(blobUrl);
    audio.play();
    if(checkPre === false){
      setCheckPre(true);
    }else{
      setCheckPre(false);
    }
  };

  const changeTestText = (e) =>{
    if(e.target.value.length <= 20){
      setTestText(e.target.value);
    }
  }

  return (
    <div className={styles.total}>
      <div className={styles.product}>
        {productDetail && (
          <div className={styles.product_left}>
            {/* <div className={styles.nickname}>{productDetail.nickname}</div> */}
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
            <div className={styles.url}>
              <div className={styles.url_txt}><BsMusicNoteList/> &nbsp;&nbsp; 미리듣기 문장 1</div>
              <audio controls>
                {/* <source src={productDetail.audioFileUrl} type="audio/mp3" /> */}
                <source src={dreamsAudio} type="audio/mp3" />
              </audio>
            </div>

            <div className={styles.url}>
              <div className={styles.url_txt}><BsMusicNoteList/> &nbsp;&nbsp; 미리듣기 문장 2 </div>
              <audio controls>
                {/* <source src={productDetail.audioFileUrl} type="audio/mp3" /> */}
                <source src={dreamsAudio} type="audio/mp3" />
              </audio>
            </div>

            <div className={styles.url}>
              <div className={styles.url_txt}><BsMusicNoteList/> &nbsp;&nbsp; 미리듣기 문장 3 </div>
              <audio controls>
                {/* <source src={productDetail.audioFileUrl} type="audio/mp3" /> */}
                <source src={dreamsAudio} type="audio/mp3" />
              </audio>  
            </div>
          </div>

          <div className={styles.test}>
            <div className={styles.text_txt}>
              <div>체험하기 <span> * 각 목소리 상품 당 3번 씩 들을 수 있습니다.</span> </div>
              <div className={styles.icon}>{useCount === 3 ? <><Bs1Circle/> <Bs2Circle/> <Bs3Circle/></>:
              useCount === 2 ? <><Bs1CircleFill/> <Bs2Circle/> <Bs3Circle/></>:
              useCount === 1 ? <><Bs1CircleFill/> <Bs2CircleFill/> <Bs3Circle/></>:
              <><Bs1CircleFill/> <Bs2CircleFill/> <Bs3CircleFill/></>
              }</div>
            </div>

            <textarea 
              name="test" id="test"
              value={testText}
              onChange={(e) => changeTestText(e)}
              maxLength={mL}
              style={{ resize: 'none' }} placeholder='듣고 싶은 내용을 입력하고 재생 버튼을 클릭하세요.'>
            </textarea>
            {
              useCount && useCount > 0 ? <div className={styles.play} onClick={() => marketProduct(testText)}><BsFillPlayCircleFill/></div>:<div></div>
            }
            <div className={styles.characterCount}>{testText.length}자 / 20자</div>
          </div>

          <div className={styles.btn}>
            <div className={styles.table}>가격표 보기</div>
            <Link to={`/purchase/${productId}`}>
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
