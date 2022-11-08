import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNav } from "../../stores/navSlice";
import { useNavigate } from "react-router-dom";
import classes from './QuizPage.module.css'

function QuizResultPage() {
  const dispatch = useDispatch()
  // 데이터 전역으로 저장해두기
  const quizResult = false
  const quizData = {
    question: "지수 폭락일을 나타내는 보통명사로 사용되는 용어다. 역사적으로는 1987년 10월 19일 뉴욕 증시가 개장 초반부터 대량의 팔자 주문이 쏟아지면서 그날 하루 22.6%가 폭락한것으로 부터 유래했는데, 이 용어는 무엇인가?",
    example: ["내가 어떻게 알까", "그거입니다", "저거입니다", "ㅎㅎㅎㅎㅎ"],
    answer: 2,
    explanation: "블랙먼데이에 관한 설명이다. - (1번) 대공황은 1929년 발생한 미국 뉴욕의 주식시장이 대폭락하여 자본주의 국가에 파급된 경제위기다. - (2번) 블랙프라이데이는 미국 최대규모의 쇼핑이 이루어진다는 날 - (4번) 블랙잉크는 레드잉크를 의미하는 적자의 반대말로 흑자를 의미한다.",
  };
  useEffect(() => {
    dispatch(setActiveNav(1))
  })
  const navigate = useNavigate();
  function backToList() {
    navigate('/');
  }
  return (
    <div className={classes.quizBG}>
      <img style={{ marginLeft: "30px"}} onClick={backToList} src={`${process.env.PUBLIC_URL}/grayBack.svg`} alt="" />
      <div className={classes.quizCtn}>
        <div>
          {quizResult ? (
            <div>
              <div className={classes.quizres}>
                <img src={`${process.env.PUBLIC_URL}/stock-list/correct.svg`} alt="" />
                <p style={{ marginTop: "10px"}}>정답입니다!</p>
              </div>
              <div className={classes.quizdon}>
                <img src={`${process.env.PUBLIC_URL}/wallet/coin.svg`} style={{width:22, height:22, marginRight: "10px"}}alt="" />
                <div className={classes.waviy} style={{ fontSize: "16px", fontWeight: "500"}}>
                  <span className={classes.waviyone}>2</span>
                  <span className={classes.waviyone}>0</span>
                  <span className={classes.waviyone}>0</span>
                  <span className={classes.waviyone}>,</span>
                  <span className={classes.waviyone}>0</span>
                  <span className={classes.waviyone}>0</span>
                  <span className={classes.waviyone}>0</span>
                  <span className={classes.waviynone} style={{marginLeft: "10px"}}>원 획득!</span>
                </div>
              </div>
            </div>
          ):(
            <div>
              <div className={classes.quizres}>
                <img src={`${process.env.PUBLIC_URL}/stock-list/wrong.svg`} alt="" />
                <p style={{ marginTop: "10px"}}>오답입니다!</p>
              </div>
              <div className={classes.quizdon}>
                <div className={classes.waviy} style={{ fontSize: "16px", fontWeight: "500"}}>
                  <span className={classes.waviynone} style={{marginRight: "10px", fontSize: "14px", fontWeight: "600", color: "#777777"}}>아쉽지만..</span>
                  <img src={`${process.env.PUBLIC_URL}/wallet/coin.svg`} style={{width:22, height:22, marginRight: "10px"}}alt="" />
                  <span className={classes.waviyone} style={{ color: "#43B8B1" }}>0</span>
                  <span className={classes.waviynone} style={{marginLeft: "10px"}}>원 획득!</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={classes.quizresbox}>
          <div style={{ fontSize: "13px",  color: "#929E9E", marginBottom: "20px" }}>{quizData.question}</div>
          <div className={classes.quizans}>{quizData.example[quizData.answer]}</div>
          <div style={{   fontWeight: "600" }}>{quizData.explanation}</div>
        </div>
      </div>
    </div>
  );
}

export default QuizResultPage;