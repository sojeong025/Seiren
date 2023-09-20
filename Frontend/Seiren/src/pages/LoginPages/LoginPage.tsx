import { AuthenticationService } from './AuthenticationService';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    AuthenticationService.loginSocialKakao();
  };

  return (
    <div>
      <button onClick={handleLogin}>카카오로그인 버튼임</button>
    </div>
  );
}

export default LoginPage;
