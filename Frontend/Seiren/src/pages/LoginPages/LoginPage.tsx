import { useEffect } from 'react';
import { AuthenticationService } from './AuthenticationService';
import styles from './LoginPage.module.css'

const LoginPage: React.FC<{ setIsNavBarVisible: (visible: boolean) => void }> = ({ setIsNavBarVisible }) => {
  const handleLogin = () => {
    AuthenticationService.loginSocialKakao();
  };

  useEffect(() => {
    setIsNavBarVisible(false);
    return() => {
      setIsNavBarVisible(true);
    }
  }, [setIsNavBarVisible]);

  return (
    <div className={styles.container}>
      <div className={styles.mainTxt}>Seiren</div>
      <div className={styles.kakao_btn} onClick={handleLogin}>
        카카오계정 로그인
      </div>
    </div>
  );
}

export default LoginPage;
