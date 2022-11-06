import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setShowNav } from "../stores/navSlice";

function LoginPage() {

  const dispatch = useDispatch()
  useEffect(() => {
    const now = window.location.pathname
    dispatch(setShowNav(now))
  })
  const REST_API_KEY = "0bb59360a92e431731e74ae18fe21a68";
  const REDIRECT_URI = "https://k7b204.p.ssafy.io/social-login";
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
