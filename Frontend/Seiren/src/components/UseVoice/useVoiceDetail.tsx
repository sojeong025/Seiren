import React, { useState } from "react";
import MyModal from "./MyModal"; // MyModal 컴포넌트 import
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { YourDataInterface } from "./YourData"; // 데이터 인터페이스를 YourData 컴포넌트에서 가져옴

interface UseVoiceDetailProps {
  data: YourDataInterface; // 상세 정보를 표시할 데이터
}

function UseVoiceDetail({ data }: UseVoiceDetailProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleModalOpen}>
        상세 정보 보기
      </Button>
      <MyModal
        open={openModal}
        onClose={handleModalClose}
        content={
          <div>
            <Typography variant="h5">상세 정보</Typography>
            <Typography>텍스트: {data.text}</Typography>
            <Typography>MP3 파일 URL: {data.mp3Url}</Typography>
            <Typography>변환 일자: {data.convertDate}</Typography>
          </div>
        }
      />
    </div>
  );
}

export default UseVoiceDetail;
