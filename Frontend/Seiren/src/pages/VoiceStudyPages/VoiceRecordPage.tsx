import { useState } from "react";
import Script from "../../components/VoiceStudy/Script";
import VoiceRecord from "../../components/VoiceStudy/VoiceRecord";
import VoiceStudyHeader from "../../components/VoiceStudy/VoiceStudyHeader";
import styles from './VoiceRecordPage.module.css'

function VoiceRecordPage() {
  const [nextCheck, setNextCheck] = useState(false);
  // console.log(nextCheck);
  return (
    <div className={styles.total}>
      <VoiceStudyHeader next={nextCheck}/> 
      <VoiceRecord/>
      <Script next={nextCheck} setNext={setNextCheck}/>
    </div>
  );
};

export default VoiceRecordPage;
