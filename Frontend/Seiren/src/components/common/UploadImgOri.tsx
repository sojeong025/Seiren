import { useRef, useState } from "react";
import AWS from "aws-sdk";
import styles from "./UploadImgOri.module.css";

function UploadImgOri({ imgUrl, setImgUrl }) {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [preImg, setPreImg] = useState("");

  AWS.config.update({
    region: import.meta.env.VITE_PUBLIC_REGION,
    accessKeyId: import.meta.env.VITE_PUBLIC_ACCESSKEY,
    secretAccessKey: import.meta.env.VITE_PUBLIC_SECRETKEY,
  });

  // 파일 올리는 곳
  const onChangeTrack = () => {
    if (!imgRef.current) {
      return;
    }

    const file = imgRef.current.files[0];

    if (!file) {
      return;
    }

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: import.meta.env.VITE_PUBLIC_BUCKET,
        Key: "testTrack/" + file.name,
        Body: file,
      },
    });

    const promise = upload.promise();
    promise
      .then(function (data) {
        console.log(data.Location);
        setImgUrl(data.Location);
        setPreImg(data.Location);
      })
      .catch(function (err) {
        console.error("사진 업로드 실패:", err);
      });
  };

  return (
    <div className={styles.container}>
      {preImg ? (
        <img src={preImg} alt="" className={styles.img} />
      ) : (
        <img src={imgUrl} alt="" className={styles.img} />
      )}
      <label className={styles.customFileUpload}>
        <input type="file" accept="image/*" ref={imgRef} onChange={onChangeTrack} />
        이미지 선택
      </label>
    </div>
  );
}

export default UploadImgOri;
