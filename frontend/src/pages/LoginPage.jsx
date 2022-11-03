import axios from "axios";

function LoginPage() {
  const loginClick = async () => {
    const result = await axios('https://kauth.kakao.com/oauth/authorize?client_id=0bb59360a92e431731e74ae18fe21a68&redirect_uri=https://k7b204.p.ssafy.io/api2/users/auth/kakao/callback&response_type=code')
    console.log(result)
  }
  return (
    <div>
      <button onClick={loginClick}>카카오로그인하는버튼~~</button>
    </div>
  );
}

export default LoginPage;