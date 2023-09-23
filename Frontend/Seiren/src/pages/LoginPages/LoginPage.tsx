import { AuthenticationService } from './AuthenticationService';
import UploadImg from '../../components/common/UploadImg';
import UploadAudio from '../../components/common/UploadAudio';


const LoginPage: React.FC = () => {
  const handleLogin = () => {
    AuthenticationService.loginSocialKakao();
  };

  return (
    <div>
      <button onClick={handleLogin}>카카오로그인 버튼임</button>
      <UploadImg/>
      <UploadAudio/>
    </div>
  );
}

export default LoginPage;
