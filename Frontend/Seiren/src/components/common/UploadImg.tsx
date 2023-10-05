import { useRef, useState } from "react";
import AWS from "aws-sdk";
import styles from "./UploadImg.module.css";

function UploadImg({ imgUrl, setImgUrl}) {
  const imgRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(imgUrl || null); // Set initial previewUrl with imgUrl if available

  AWS.config.update({
    region: import.meta.env.VITE_PUBLIC_REGION,
    accessKeyId: import.meta.env.VITE_PUBLIC_ACCESSKEY,
    secretAccessKey: import.meta.env.VITE_PUBLIC_SECRETKEY,
  });

  const onChangeTrack = () => {
    if (!imgRef.current) {
      return;
    }

    const file = imgRef.current.files[0];

    if (!file) {
      return;
    }

    // 파일을 미리보기 URL로 변환
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);
  };

  const handleUpload = () => {
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
    promise.then(
      function (data) {
        console.log(data);
        setImgUrl(data.Location);
      },
      function (err) {
        console.error("사진 업로드 실패", err);
      }
    );
  };

  return (
    <div className={styles.file_input}>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="미리보기"
          className={styles.preimg}
        />
      )}
        <div>
        <label className={styles.customFileLabel} htmlFor="file">
          이미지 선택
        </label>
        <input
          type="file"
          accept="image/*"
          id="file"
          ref={imgRef}
          onChange={onChangeTrack}
          className={styles.hiddenFileInput}
        />
        <label onClick={handleUpload} className={styles.button}>
          변경
        </label>
      </div>
    </div>
  );
}

export default UploadImg;
