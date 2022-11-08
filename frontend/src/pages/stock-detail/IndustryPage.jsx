import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { categoryGet } from "../../stores/stockSlice";
import { ListItemSecondaryAction } from "@mui/material";
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
        <div style={{ width: "80%", border: "1px solid blue" }}>
          <div>1위 🥇</div>
          <div>{word.word}</div>
        </div>
      );
    } else if (word.ranking === 2) {
      return (
        <div style={{ width: "80%", border: "1px solid red" }}>
          <div>2위 🥈</div>
          <div>{word.word}</div>
        </div>
      );
    } else if (word.ranking === 3) {
      return (
        <div style={{ width: "80%", border: "1px solid red" }}>
          <div>3위 🥉</div>
          <div>{word.word}</div>
        </div>
      );
    }
    return;
  }
  function KeywordSmallCard(word) {
    if (word.ranking > 3) {
      return <div>{word.word}</div>;
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
        <div style={{ border: border }}>
          <img src={`${process.env.PUBLIC_URL}/stock-detail/rain.svg`} alt="" />
        </div>
      );
    } else if (sen.thisIndex === 1) {
      // 보통일때
      if (sen.thisIndex === sen.maxIndex) {
        border = "2px solid #FEBF45";
      }
      return (
        <div style={{ border: border }}>
          <img
            src={`${process.env.PUBLIC_URL}/stock-detail/cloudy.svg`}
            alt=""
          />
        </div>
      );
    } else {
      if (sen.thisIndex === sen.maxIndex) {
        border = "2px solid #B1CC33";
      }
      return (
        <div style={{ border: border }}>
          <img src={`${process.env.PUBLIC_URL}/stock-detail/sun.svg`} alt="" />
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
      <div>
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
          onClick={backTo}
          src={`${process.env.PUBLIC_URL}/stock-detail/back.svg`}
          alt=""
        />
      </div>
      <h1>{industryData.name}</h1>
      <div>{industryData.info}</div>
      <div style={{ width: "100%", height: 2, backgroundColor: "#EAF0EF" }} />
      <div>
        <div>이 업종 최신 키워드</div>
        <img
          src={`${process.env.PUBLIC_URL}/stock-detail/keyword.svg`}
          alt=""
        />
        <div>
          {industryData.keyword &&
            industryData.keyword.map((word, index) => (
              <KeywordLankCard key={word} word={word} ranking={index + 1} />
            ))}
        </div>
        <div>
          {industryData.keyword &&
            industryData.keyword.map((word, index) => (
              <KeywordSmallCard key={word} word={word} ranking={index + 1} />
            ))}
        </div>
      </div>
      <div style={{ width: "100%", height: 2, backgroundColor: "#EAF0EF" }} />
      <div>
        <div>{industryData.name} 대표 종목</div>
        <img src={`${process.env.PUBLIC_URL}/stock-detail/cart.svg`} alt="" />
        {industryData.represent && (
          <div style={{ backgroundColor: "green" }}>
            <div>{industryData.represent[0]}</div>
            <div>{industryData.represent[1]}</div>
            <div>{industryData.represent[2]}</div>
          </div>
        )}
      </div>
      <div style={{ width: "100%", height: 2, backgroundColor: "#EAF0EF" }} />
      <div>
        <div>오늘 {industryData.name} 날씨는?</div>
        <img
          src={`${process.env.PUBLIC_URL}/stock-detail/newspaper.svg`}
          alt=""
        />
      </div>
      <div>{industryData.sentiment && <WeatherCards />}</div>
    </div>
  );
}

export default IndustryPage;
