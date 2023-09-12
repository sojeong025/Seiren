import React from 'react';
import styles from './MyInfo.module.css';
import avatar from '../../assets/preview.png';

function MyInfo() {
  return (
    <div className={styles.profileContainer}>
      <img className={styles.profileImage} src={avatar} alt="Profile" />
      <div>
        <div className={styles.nickName}>JE HYUN</div>
        <div className={styles.feel}>#뭘보노 #보노보노야 #앙?</div>
      </div>
    </div>
  );
}

export default MyInfo;
