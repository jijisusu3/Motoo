import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { categoryGet } from "../../stores/stockSlice";
import { ListItemSecondaryAction } from "@mui/material";
import classes from "./IndustryPage.module.css";
import userEvent from "@testing-library/user-event";

function IndustryPage() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const industryData = useSelector((state) => {
    return state.setStock.category;
  });
  function backTo() {
    navigate(-1);
  }
  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
    dispatch(categoryGet(Number(id)));
  }, []);

  function KeywordLankCard(word) {
    if (word.ranking === 1) {
      return (
        <div className={classes.rankfst}>
          <div className={classes.num}>1위 🥇</div>
          <div>{word.word}</div>
        </div>
      );
    } else if (word.ranking === 2) {
      return (
        <div className={classes.rank}>
          <div className={classes.num}>2위 🥈</div>
          <div>{word.word}</div>
        </div>
      );
    } else if (word.ranking === 3) {
      return (
        <div className={classes.rank}>
          <div className={classes.num}>3위 🥉</div>
          <div>{word.word}</div>
        </div>
      );
    }
    return;
  }
  function KeywordSmallCard(word) {
    if (word.ranking > 3) {
      return (
        <div className={classes.parent}>
          <div className={classes.smbox}>{word.word}</div>
        </div>

      );
    }
  }

  function WeatherCard(sen) {
    let border = "1px solid #C4CECE";
    // 나쁨일때
    if (sen.thisIndex === 0) {
      if (sen.thisIndex === sen.maxIndex) {
        border = "2px solid #DD4956";
      }
      return (
        <div className={classes.weatherbox}  style={{ border: border }}>
          <img className={classes.wimg} src={`${process.env.PUBLIC_URL}/stock-detail/rain.svg`} alt="" />
          <div className={classes.perc}>지수야</div>
        </div>
      );
    } else if (sen.thisIndex === 1) {
      // 보통일때
      if (sen.thisIndex === sen.maxIndex) {
        border = "2px solid #FEBF45";
      }
      return (
        <div className={classes.weatherbox}  style={{ border: border }}>
          <img className={classes.wimg} src={`${process.env.PUBLIC_URL}/stock-detail/cloudy.svg`} alt=""/>
          <div className={classes.perc}>퍼센트</div>
        </div>
      );
    } else {
      if (sen.thisIndex === sen.maxIndex) {
        border = "2px solid #B1CC33";
      }
      return (
        <div className={classes.weatherbox}  style={{ border: border }}>
          <img className={classes.wimg} src={`${process.env.PUBLIC_URL}/stock-detail/sun.svg`} alt="" />
          <div className={classes.perc}>너어죠</div>
        </div>
      );
    }
  }
  function WeatherCards() {
    const sentiments = industryData.sentiment;
    const max_num = Math.max(...sentiments);
    let max_index = 0;
    sentiments.forEach((element, index) => {
      if (element === max_num) {
        max_index = index;
      }
    });
    return (
      <div className={classes.edge}>
        {sentiments.map((sentiment, index) => (
          <WeatherCard
          key={index}
          sen={sentiment}
          maxIndex={max_index}
          thisIndex={index}
          />
          ))}
      </div>
    );
  }
  
  return (
    <div>
      <div>
        <img
          className={classes.back}
          onClick={backTo}
          src={`${process.env.PUBLIC_URL}/stock-detail/back.svg`}
          alt=""
        />
      </div>
      <div className={classes.hrline}></div>
      <div className={classes.titlebox}>
        <div className={classes.title}>{industryData.name}</div>
        <div className={classes.txts}>{industryData.info}</div>
      </div>
      <div className={classes.hrline}></div>
      <div className={classes.rowbox}>
        <div className={classes.today}>오늘 {industryData.name} 날씨는?</div>
        <img
          src={`${process.env.PUBLIC_URL}/stock-detail/newspaper.svg`}
          alt=""
        />
      </div>
      <div className={classes.news}>*네이버 뉴스 기반</div>
      <div className={classes.weather}>{industryData.sentiment && <WeatherCards />}</div>
      <div className={classes.hrline}></div>
      <div className={classes.rowbox}>
      <div className={classes.today}>{industryData.name} 업종 최신 키워드</div>
        <img
          src={`${process.env.PUBLIC_URL}/stock-detail/keyword.svg`}
          alt=""
        />
      </div>
      <div className={classes.box}>
        <div className={classes.top}>
          {industryData.keyword &&
            industryData.keyword.map((word, index) => (
              <KeywordLankCard key={word} word={word} ranking={index + 1} />
            ))}
        </div>
        <div className={classes.boxes}>
          {industryData.keyword &&
            industryData.keyword.map((word, index) => (
              <KeywordSmallCard key={word} word={word} ranking={index + 1} />
            ))}
        </div>
      </div>
      <div className={classes.hrline}></div>
      <div className={classes.rowbox}>
        <div className={classes.today}>{industryData.name} 업종 대표 종목</div>
        <img src={`${process.env.PUBLIC_URL}/stock-detail/cart.svg`} alt="" />
      </div>
        {industryData.represent && (
          <div className={classes.repre}>
            <div className={classes.rtext}>{industryData.represent[0]}</div>
            <div className={classes.space}>|</div>
            <div className={classes.rtext}>{industryData.represent[1]}</div>
            <div className={classes.space}>|</div>
            <div className={classes.rtext}>{industryData.represent[2]}</div>
          </div>
        )}
    </div>
  );
}

export default IndustryPage;
