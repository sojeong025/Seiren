import styles from './ProductCutomPage.module.css'
import { customAxios } from '../../libs/axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { VoiceIdState } from '../../recoil/RecordAtom';
import AWS, { AlexaForBusiness } from "aws-sdk";
import { motion, AnimatePresence } from 'framer-motion';
import { BiSolidCheckSquare } from 'react-icons/bi'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { LiaRandomSolid } from 'react-icons/lia'

function Section({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div layout initial={{ borderRadius: 10 }} className={styles.section}>
      <div className={styles.section_top}>
        <div className={styles.section_title}>{title}</div>
        <div className={styles.section_btn} onClick={toggleOpen}>{isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}</div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


function ProductCustomPage(){
  const navigate = useNavigate();
  const voiceId = useRecoilValue(VoiceIdState)
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [productImg, setProductImg] = useState();
  const [price, setPrice] = useState();
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [mood, setMood] = useState("");
    
  // 3가지 미리듣기
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text1Length, setText1Length] = useState(0);
  const [text2Length, setText2Length] = useState(0);
  const [text3Length, setText3Length] = useState(0);

  const generateRandomAvatar = () => {
    const randomEyebrows = Math.floor(Math.random() * 15) + 1; // 눈썹
    const randomEyes = Math.floor(Math.random() * 26) + 1; // 눈
    const randomHairType = Math.random() < 0.5 ? 'long' : 'short'; // 머리 길이
    const randomHairNumberLong = Math.floor(Math.random() * (26 -1)) +1; // long
    const randomHairNumberShort= Math.floor(Math.random()* (19 -1)) +1; // short
    
    let hairVariant; // 머리 카락
      if(randomHairType === 'long'){
          hairVariant= `${randomHairType}${String(randomHairNumberLong).padStart(2,'0')}`
      }
      else{
          hairVariant= `${randomHairType}${String(randomHairNumberShort).padStart(2,'0')}`
      }
      const randomMouth = Math.floor(Math.random() *30) +1 ;
      
    var skinColorArray=["9e5622","763900","ecad80", "f2d3b1"]; // 피부색
    var skinColorRandom=skinColorArray[Math.floor(Math.random()*skinColorArray.length)];
    var hairColorArray=["0e0e0e","3eac2c","6a4e35","85c2c6","796a45","562306",
                      "592454","ab2a18","ac6511", "afafaf", "b9a05f", 
                      "cb6820", "dba3be", "e5d7a3"];
    var hairColorRandom=hairColorArray[Math.floor(Math.random()*hairColorArray.length)]; // 머리카락 색

    
    // 최종 캐릭터
    let dicebearUrl=`https://api.dicebear.com/7.x/adventurer/svg?flip=true&eyebrows=${`variant${String(randomEyebrows).padStart(2,'0')}`}&eyes=${`variant${String(randomEyes).padStart(2,'0')}`}&hair=${hairVariant}&mouth=${`variant${String(randomMouth).padStart(2,'0')}`}&skinColor=${skinColorRandom}&hairColor=${hairColorRandom}`;
    
    console.log(dicebearUrl);
    setProductImg(dicebearUrl);
  };


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(title)
  };
  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };
  const handlePriceChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };
  const handleText1Change = (e) => {
    setText1(e.target.value);
    setText1Length(e.target.value.length);
  };
  const handleText2Change = (e) => {
    setText2(e.target.value);
    setText2Length(e.target.value.length);
  };
  const handleText3Change = (e) => {
    setText3(e.target.value);
    setText3Length(e.target.value.length);
  };

  useEffect(() => {
    customAxios.get(`voices/${voiceId}`)
      .then((res) => {
        console.log("장터 등록하기 위해 정보 가져오기", res)
        setTitle(res.data.response.voiceTitle)
        setSummary(res.data.response.memo)
        setProductImg(res.data.response.voiceAvatarUrl)
      })
      .catch((err) => console.log(err))

      generateRandomAvatar();
  }, [voiceId])


  const marketProduct = async () => {
    const categoryList=[gender, ageGroup, mood];

    const previews = await Promise.all([text1, text2, text3].map(async (text) => {

    // 수정 필요
    const aiUrl = await fetchAIUrl(text); 
    
    const response = await fetch(aiUrl);
    const file = await response.blob();

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: import.meta.env.VITE_PUBLIC_BUCKET,
        Key: "testTrack/" + Date.now(),
        Body: file,
      },
    });

    const data = await upload.promise();
    return { text, url: data.Location };
  }));
  

    const productData = {
      voiceId: voiceId,
      productTitle: title,
      summary: summary,
      productImageUrl: productImg,
      price: price,
      categoryList: categoryList,
      previewTexts: [...previews.map(preview => preview.text)], 
      previewUrls : [...previews.map(preview => preview.url)],
    };

    console.log(productData);

    customAxios.post("product", productData)
      .then((res) => {
        console.log("장터에 올리기 성공", res);
        navigate('/sell-list')
      })
      .catch((err) => console.log(err))
    };

  return(
    <div className={styles.total}>
      <div className={styles.form}>
        <div className={styles.infor}>
          {/* 좌측엔 이미지만 */}
          <div className={styles.product_img}>
            <img src={productImg} alt="이미지" />
            <div className={styles.btn_random} onClick={generateRandomAvatar}>
            Randomize <LiaRandomSolid /></div>
          </div>

          {/* 기본정보 자리 */}
          <div>
            <Section title="기본 정보">
              <div className={styles.section1}>
                <div className={`${styles.input} ${styles.title}`}>상품 제목 : <input type="text" value={title} onChange={handleTitleChange} /></div>
                <div className={styles.input}>상품 정보 <br/> <textarea className={styles.textarea} id="summary" name="summary" value={summary} onChange={handleSummaryChange} /></div>
              </div>
            </Section>
    
            <Section title ="가격 설정">
              <div className={styles.section2}>
                <div className={styles.input}>상품 가격 : <input type="text" value={price} onChange={handlePriceChange} /> / 원 <span>(단위)</span></div>
              </div>
            </Section>

            <Section title ="카테고리 설정">
              <div className={styles.section3}>
                  <div className={styles.gender}>
                    <div className={styles.category}>성별</div>
                    <input className={styles.radio} type="radio" name="gender" value="5" onChange={(e) => setGender(e.target.value)} /> 남
                    <input className={styles.radio} type="radio" name="gender" value="6" onChange={(e) => setGender(e.target.value)} /> 여
                  </div>
                  <div className={styles.age}>
                    <div className={styles.category}>연령대</div>
                    <input className={styles.radio} type="radio" name="ageGroup" value="7" onChange={(e) => setAgeGroup(e.target.value)} /> 유아
                    <input className={styles.radio} type="radio" name="ageGroup" value="8" onChange={(e) => setAgeGroup(e.target.value)} /> 청소년
                    <input className={styles.radio} type="radio" name="ageGroup" value="9" onChange={(e) => setAgeGroup(e.target.value)} /> 청년
                    <input className={styles.radio} type="radio" name="ageGroup" value="10" onChange={(e) => setAgeGroup(e.target.value)} /> 중년
                    <input className={styles.radio} type="radio" name="ageGroup" value="11" onChange={(e) => setAgeGroup(e.target.value)} /> 노인
                  </div>
                  <div className={styles.mood}>
                    <div className={styles.category}>분위기</div>
                    <input className={styles.radio} type="radio" name="mood" value="12" onChange={(e) => setMood(e.target.value)} /> 따뜻
                    <input className={styles.radio} type="radio" name="mood" value="13" onChange={(e) => setMood(e.target.value)} /> 활발
                    <input className={styles.radio} type="radio" name="mood" value="14" onChange={(e) => setMood(e.target.value)} /> 무뚝뚝
                    <input className={styles.radio} type="radio" name="mood" value="15" onChange={(e) => setMood(e.target.value)} /> 우울
                  </div>
              </div>
            </Section>

            <Section title ="미리 듣기 문장 설정">
              <div className={styles.section4}>
                <div className={styles.input}>
                  문장 1 : <input type='text' value ={text1} className={styles.input4}
                        onChange={handleText1Change} maxLength="20" /><span className={styles.smallText}>{`${text1Length}/20자`}</span>
                </div>
                <div className={styles.input}>
                  문장 2 : <input  type='text' value ={text2} className={styles.input4}
                        onChange={handleText2Change} maxLength="20" /><span className={styles.smallText}>{`${text2Length}/20자`}</span>
                </div>
                <div className={styles.input}>
                  문장 3 : <input type='text' value ={text3} className={styles.input4}
                  onChange={handleText3Change} maxLength="20" /><span className={styles.smallText}>{`${text3Length}/20자`}</span>
                </div>
              </div>
            </Section>

          </div>
      </div>
      <div className={styles.sub}>
        <div className={styles.submit} onClick={marketProduct}> 
          등록하기 <BiSolidCheckSquare/> </div>
      </div>
    </div>
  </div>
  )
}

export default ProductCustomPage;