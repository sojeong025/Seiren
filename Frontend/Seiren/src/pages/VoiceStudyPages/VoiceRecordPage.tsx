import Script from "../../components/VoiceStudy/Script";
import VoiceRecord from "../../components/VoiceStudy/VoiceRecord";
import VoiceStudyHeader from "../../components/VoiceStudy/VoiceStudyHeader";
import styles from './VoiceRecordPage.module.css'

function VoiceRecordPage() {
  return (
    <div className={styles.total}>
      <VoiceStudyHeader /> 
      <VoiceRecord/>
      <Script/>
    </div>
  );
};

export default VoiceRecordPage;
