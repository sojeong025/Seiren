import { useState } from 'react';
import Script from "../../components/VoiceStudy/Script";
import VoiceRecord from "../../components/VoiceStudy/VoiceRecord";
import VoiceStudyHeader from "../../components/VoiceStudy/VoiceStudyHeader";

function VoiceRecordPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0); // currentIndex 상태 생성

  return (
    <div>
      {/* currentIndex 값을 prop으로 전달 */}
      <VoiceStudyHeader currentIndex={currentIndex} totalIndex={10} /> 
      <VoiceRecord/>
      {/* Script에도 index와 setIndex prop 전달 */}
      <Script index={currentIndex} setIndex={setCurrentIndex}/>
    </div>
  );
};

export default VoiceRecordPage;
