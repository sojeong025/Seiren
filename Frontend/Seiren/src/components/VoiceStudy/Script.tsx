import { useState } from "react";
import styles from "./Script.module.css"

const Script: React.FC = () => {
  // 더미 데이터
  const scripts = [
    "스크립트 문장 1",
    "스크립트 문장 2",
    "스크립트 문장 3",
    "스크립트 문장 4",
    "스크립트 문장 5",
    "스크립트 문장 6",
  ];

  const [index, setIndex] = useState<number>(0);

  const goNext = (): void => {
    if (index < scripts.length-1) setIndex(index+1)
  }

  return (
    <div className={styles.text}>
      {scripts[index]}
      <br />
      {scripts[index + 1]}
      <button onClick={goNext}>다음</button>
    </div>
  );
};

export default Script;
