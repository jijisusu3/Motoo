import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setShowNav } from "../stores/navSlice";
import classes from "./LoginPage.module.css";

import Slider from "react-slick";
import './slick.css';
import './slick-theme.css';


function LoginPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

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
    <div className={classes.loginbg}>
      <div className={classes.bigbox}>

        <div>
          <button className={classes.kakao} onClick={kakaoLoginClick}>하하하</button>
        </div>
      </div>
    </div>
  );
}


export default LoginPage;
