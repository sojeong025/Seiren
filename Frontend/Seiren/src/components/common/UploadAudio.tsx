import { useState, useRef } from "react";
import AWS from "aws-sdk";

function UploadAudio() {
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef<HTMLInputElement | null>(null);

  AWS.config.update({
    region: import.meta.env.VITE_PUBLIC_REGION,
    accessKeyId: import.meta.env.VITE_PUBLIC_ACCESSKEY,
    secretAccessKey: import.meta.env.VITE_PUBLIC_SECRETKEY,
  });

  // 파일 올리는 곳
  const onChangeTrack = () => {
    const file = audioRef.current.files[0];

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
        setAudioUrl(data.Location);
      },
      function (err) {
        return err("음성 업로드 실패");
      },
    );
  };
}

export default UploadAudio;
