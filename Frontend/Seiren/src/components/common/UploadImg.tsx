import { useState, useRef } from "react";
import AWS, { AlexaForBusiness } from "aws-sdk";

function UploadImg(){
  const [imgUrl, setImgUrl] = useState(null);
  const imgRef = useRef();

  AWS.config.update({
    region: import.meta.env.VITE_PUBLIC_REGION,
    accessKeyId: import.meta.env.VITE_PUBLIC_ACCESSKEY,
    secretAccessKey: import.meta.env.VITE_PUBLIC_SECRETKEY,
  });

  // 파일 올리는 곳
  const onChangeTrack = () => {
    const file = imgRef.current.files[0];

    if (!file) {
      return;
    }

    // setTrackName(file.name);
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
        console.log(data)
        setImgUrl(data.Location);
      },
      function (err) {
        return err("사진 업로드 실패");
      }
    );
  };

  return(
    <div>
      <input
        type="file"
        accept="image/*"
        ref={imgRef}
        onChange={onChangeTrack}
      />
    </div>
  );
};

export default UploadImg;