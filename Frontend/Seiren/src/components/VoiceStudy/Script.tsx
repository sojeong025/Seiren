import { useState } from "react";
import styles from "./Script.module.css"
import VoiceStudyHeader from "./VoiceStudyHeader";

const Script: React.FC = () => {
  // 더미 데이터 생성
  const scripts = Array.from({length: 10}, (_, i) => `스크립트 문장 ${i+1}`);

  const [index, setIndex] = useState<number>(0);

  const goNext = (): void => {
    if (index < scripts.length-1) setIndex(index+1)
  }

  return (
    <div>
      <VoiceStudyHeader currentIndex={index} /> {/* index 값을 prop으로 전달 */}
      
      <div className={styles.text}>
        {scripts[index]}
        <br />
        {scripts[index + 1]}
        <button onClick={goNext}>다음</button>
      </div>
    </div>
  );
};

export default Script;

