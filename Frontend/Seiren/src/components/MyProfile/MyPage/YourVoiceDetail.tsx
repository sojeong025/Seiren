import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../../../libs/axios";
import { VoiceIdState } from "../../../recoil/RecordAtom";
import State from "./State";
import { useRecoilState } from "recoil";
import UploadImgOri from "../../common/UploadImgOri";
import SideBar from "../../../components/common/SideBar";
import styles from "./YourVoiceDetail.module.css";
import { LiaRandomSolid } from "react-icons/lia";

function EditVoiceDetail({ setIsNavBarVisible }) {
  const { voiceId } = useParams();
  const [voiceDetail, setVoiceDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [voiceTitle, setVoiceTitle] = useState(""); // 상태로 voiceTitle을 관리합니다.
  const [memo, setMemo] = useState(""); // 상태로 memo를 관리합니다.
  const [voiceAvatarUrl, setVoiceAvatarUrl] = useState(""); //
  const navigate = useNavigate();
  const [checkState, setCheckState] = useState(false);

  const [recoilVoiceId, setRecoilVoiceId] = useRecoilState(VoiceIdState);

  useEffect(() => {
    setIsNavBarVisible(false); // 네비게이션 바 숨기기

    return () => {
      setIsNavBarVisible(true); // 컴포넌트가 언마운트될 때 네비게이션 바 다시 보이기
    };
  }, [setIsNavBarVisible]);

  useEffect(() => {
    setRecoilVoiceId(voiceId);
    customAxios
      .get(`voices/${voiceId}`)
      .then(response => {
        const voiceDetailData = response.data.response;
        setVoiceDetail(voiceDetailData);
        setVoiceTitle(voiceDetailData.voiceTitle); // voiceTitle 초기값 설정
        setMemo(voiceDetailData.memo); // memo 초기값 설정
        setVoiceAvatarUrl(voiceDetailData.voiceAvatarUrl);
        // setVoiceId(voiceId)
        // console.log(voiceDetailData);
      })
      .catch(error => {
        // console.error("API 호출 중 오류 발생:", error);
      });
  }, [voiceId, checkState]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedData = {
      voiceId: voiceDetail.voiceId,
      voiceTitle: voiceTitle,
      memo: memo,
      voiceAvatarUrl: voiceAvatarUrl,
    };

    customAxios
      .put(`voices`, updatedData)
      .then(response => {
        setIsEditing(false);
        setVoiceDetail(prevState => ({
          ...prevState,
          voiceTitle: updatedData.voiceTitle,
          memo: updatedData.memo,
          voiceAvatarUrl: updatedData.voiceAvatarUrl,
        }));
        // console.log(response);
      })
      .catch(error => {
        // console.error("수정 중 오류 발생:", error);
      });
  };

  const generateRandomAvatar = () => {
    const randomEyebrows = Math.floor(Math.random() * 15) + 1; // 눈썹
    const randomEyes = Math.floor(Math.random() * 26) + 1; // 눈
    const randomHairType = Math.random() < 0.5 ? "long" : "short"; // 머리 길이
    const randomHairNumberLong = Math.floor(Math.random() * (26 - 1)) + 1; // long
    const randomHairNumberShort = Math.floor(Math.random() * (19 - 1)) + 1; // short

    let hairVariant; // 머리 카락
    if (randomHairType === "long") {
      hairVariant = `${randomHairType}${String(randomHairNumberLong).padStart(2, "0")}`;
    } else {
      hairVariant = `${randomHairType}${String(randomHairNumberShort).padStart(2, "0")}`;
    }
    const randomMouth = Math.floor(Math.random() * 30) + 1;

    var skinColorArray = ["9e5622", "763900", "ecad80", "f2d3b1"]; // 피부색
    var skinColorRandom = skinColorArray[Math.floor(Math.random() * skinColorArray.length)];
    var hairColorArray = [
      "0e0e0e",
      "3eac2c",
      "6a4e35",
      "85c2c6",
      "796a45",
      "562306",
      "592454",
      "ab2a18",
      "ac6511",
      "afafaf",
      "b9a05f",
      "cb6820",
      "dba3be",
      "e5d7a3",
    ];
    var hairColorRandom = hairColorArray[Math.floor(Math.random() * hairColorArray.length)]; // 머리카락 색

    // 최종 캐릭터
    var dicebearUrl = `https://api.dicebear.com/7.x/adventurer/svg?flip=true&eyebrows=${`variant${String(
      randomEyebrows,
    ).padStart(2, "0")}`}&eyes=${`variant${String(randomEyes).padStart(
      2,
      "0",
    )}`}&hair=${hairVariant}&mouth=${`variant${String(randomMouth).padStart(
      2,
      "0",
    )}`}&skinColor=${skinColorRandom}&hairColor=${hairColorRandom}`;

    // 새로운 아바타 URL을 상태로 업데이트
    setVoiceAvatarUrl(dicebearUrl);

    // console.log(dicebearUrl);
  };

  const handleDeleteClick = () => {
    customAxios
      .delete(`voices/${voiceId}`)
      .then(res => {
        // console.log("내 목소리 삭제 성공", res);
        navigate("/my-page");
      })
      .catch(err => console.log(err));
  };

  if (voiceDetail === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SideBar />
      <div className={styles.YourVoiceDetailContainer}>
        {/* 필요한 부분 : 상태 값 변경 */}
        {/* 수정해보기 */}

        {/* 왼쪽 부분임 */}
        <div className={styles.imgContainer}>
          <div className={styles.imgEdit}>
            <img src={voiceAvatarUrl} />
            <div className={styles.btn_random} onClick={generateRandomAvatar}>
              Randomize <LiaRandomSolid />
            </div>
          </div>
          <div className={styles.downBox}>
            {isEditing ? (
              <>
                <div>
                  <div className={styles.minTitle}>상품 제목</div>
                  <div className={styles.voiceTitle}>
                    <input
                      type="text"
                      value={voiceTitle}
                      onChange={e => setVoiceTitle(e.target.value)}
                      className={styles.inputTitle}
                    />
                  </div>
                </div>
                <div className={styles.minMemo}>상품 설명</div>
                <div className={styles.memo}>
                  <input
                    type="text"
                    value={memo}
                    onChange={e => setMemo(e.target.value)}
                    className={styles.inputMemo}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.minTitle}>상품 제목</div>
                <div className={styles.voiceTitle}>
                  <div>{voiceDetail.voiceTitle}</div>
                </div>
                <div className={styles.minMemo}>상품 설명</div>
                <div className={styles.memo}>
                  <div>{voiceDetail.memo}</div>
                </div>
              </>
            )}
            <div className={styles.buttons}>
              {isEditing ? <div onClick={handleSaveClick}>저장</div> : <div onClick={handleEditClick}>수정</div>}
              <div className={styles.deletebtn} onClick={handleDeleteClick}>
                삭제
              </div>
            </div>
            <div className={styles.stateBox}>
              <State voiceDetail={voiceDetail} checkState={checkState} setCheckState={setCheckState} />
            </div>
          </div>
        </div>

        {/* <div className={styles.contentContainer}>
          <div className={styles.upBox}>
            <div className={styles.imgContainer}>
              <UploadImgOri imgUrl={voiceDetail.voiceAvatarUrl} setImgUrl={setVoiceAvatarUrl} />
              <button className={styles.savebtn} onClick={handleSaveClick}>
                저장
              </button>
            </div>
            <div className={styles.stateBox}>
              <State voiceDetail={voiceDetail} checkState={checkState} setCheckState={setCheckState}/>
            </div>
          </div>


        </div> */}
      </div>
    </div>
  );
}

export default EditVoiceDetail;
