import styles from './VoiceStudyingPage.module.css'

function VoiceStudyingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contain}>
        <div>
          <img className={styles.img} src="src/assets/img/working.png" alt="학습중" />
        </div>
        {/* <div className={styles.percent}>
          20%
        </div> */}
        <div className={styles.txt}>
          <div className={styles.text}>
            목소리를 생성하고 있어요
          </div>
          <hr />
          <div className={styles.sidetext}>
            완료 후 자동으로 페이지가 전환돼요. <br/>
            학습을 완료하는 데는 대략 1시간이 소요됩니다.
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceStudyingPage;