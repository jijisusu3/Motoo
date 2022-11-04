import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const REST_API_KEY = "0bb59360a92e431731e74ae18fe21a68";
  const REDIRECT_URI = "http://localhost:3000/social-login";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  function kakaoLoginClick() {
    window.location.replace(KAKAO_AUTH_URI)
    }
  return (
    <div>
      <button onClick={kakaoLoginClick}>카카오로그인하는버튼~~</button>
    </div>
  );
}

export default LoginPage;
