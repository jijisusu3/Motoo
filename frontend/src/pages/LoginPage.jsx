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
        <Slider {...settings}>
            <div className={classes.ctnbox}>
              <div className={classes.subbox}>
                <p style={{marginTop: '5px'}} className={classes.logintitle}>돈 걱정 없이</p>
                <p className={classes.logintitle}>투자 감각을 익혀보세요!</p>
                <p style={{marginTop: '5px'}} className={classes.subtitle}>실시간 반영되는 주가와 제공되는 시드로</p>
                <p style={{marginBottom: '30px'}} className={classes.subtitle}>현실과 가까운 투자를 경험해볼 수 있어요!</p>
                <img className={classes.bounce} style={{margin:"auto", width:"90%"}} src={`${process.env.PUBLIC_URL}/loginstatic/sub1.svg`} alt="" />
                <svg className={classes.cross} width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="75" width="50" height="200" rx="10" fill="#E4F8EE"/>
                <rect y="125" width="50" height="200" rx="10" transform="rotate(-90 0 125)" fill="#E4F8EE"/>
                </svg>
                <svg className={classes.cross2} width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="75" width="50" height="200" rx="10" fill="#E4F8EE"/>
                <rect y="125" width="50" height="200" rx="10" transform="rotate(-90 0 125)" fill="#E4F8EE"/>
                </svg>
                <svg className={classes.cross3} width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="75" width="50" height="200" rx="10" fill="#E4F8EE"/>
                <rect y="125" width="50" height="200" rx="10" transform="rotate(-90 0 125)" fill="#E4F8EE"/>
                </svg>
                {/* <svg className={classes.cross4} width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="75" width="50" height="200" rx="10" fill="#FCF9F3"/>
                <rect y="125" width="50" height="200" rx="10" transform="rotate(-90 0 125)" fill="#FCF9F3"/>
                </svg> */}
              </div>
            </div>
            <div className={classes.ctnbox}>
              <div className={classes.subbox}>
                <p style={{marginTop: '5px'}} className={classes.logintitle}>어려운 주식 투자</p>
                <p className={classes.logintitle}>모투와 쉽게 시작하세요</p>
                <p style={{marginTop: '5px'}} className={classes.subtitle}>용어 설명은 물론, </p>
                <p style={{marginBottom: '30px'}} className={classes.subtitle}>종목 및 기업분석까지 모두 알려드려요!</p>
                <img className={classes.bounce} style={{margin:"auto", width:"90%"}} src={`${process.env.PUBLIC_URL}/loginstatic/sub2.svg`} alt="" />
                <svg className={classes.blah} width="120" height="80" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="140" rx="20" fill="white"/>
                <path d="M93 211.5L133.27 115.5H52.7299L93 211.5Z" fill="white"/>
                </svg>
                <h1 className={classes.dotdotdot}>motoo !</h1>
              </div>
            </div>
            <div className={classes.ctnbox}>
              <div className={classes.subbox}>
                <p style={{marginTop: '5px'}} className={classes.logintitle}>학교를 등록하고</p>
                <p className={classes.logintitle}>학교대항전에 참가해보세요!</p>
                <p style={{marginTop: '5px'}} className={classes.subtitle}>우리 학교를 지역 내 </p>
                <p style={{marginBottom: '30px'}} className={classes.subtitle}>수익률 최고의 학교로 만들어보아요!</p>
                <img className={classes.bounce} style={{margin:"auto", width:"90%"}} src={`${process.env.PUBLIC_URL}/loginstatic/sub3.svg`} alt="" />
                <img className={classes.ap1} style={{width: "30px", height: "30px"}} src={`${process.env.PUBLIC_URL}/loginstatic/ap1.svg`} alt="" />
                <img className={classes.ap2} style={{width: "30px", height: "30px"}} src={`${process.env.PUBLIC_URL}/loginstatic/ap2.svg`} alt="" />
                <img className={classes.ap3} style={{width: "30px", height: "30px"}} src={`${process.env.PUBLIC_URL}/loginstatic/ap3.svg`} alt="" />
              </div>
            </div>
          </Slider>
        <div>
          <button className={classes.kakao} onClick={kakaoLoginClick}><img src={`${process.env.PUBLIC_URL}/loginstatic/kakao.svg`} alt="" /></button>
        </div>
      </div>
    </div>
  );
}


export default LoginPage;
