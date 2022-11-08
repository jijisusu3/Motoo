import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveNav } from "../../stores/navSlice";
import { useNavigate } from "react-router-dom";
import classes from './QuizPage.module.css'

function QuizPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveNav(1));
  });
  const navigate = useNavigate();
  function backToList() {
    navigate('/');
  }
  // 데이터 전역으로 저장해두기
  const quizData = {
    question: "지수 폭락일을 나타내는 보통명사로 사용되는 용어다. 역사적으로는 1987년 10월 19일 뉴욕 증시가 개장 초반부터 대량의 팔자 주문이 쏟아지면서 그날 하루 22.6%가 폭락한것으로 부터 유래했는데, 이 용어는 무엇인가?",
    example: ["내가 어떻게 알까", "그거입니다", "저거입니다", "정부지출의 증가 때문에 민간부문의 투자가 증가하는 현상"],
    answer: 3,
    explanation: "블랙먼데이에 관한 설명이다. - (1번) 대공황은 1929년 발생한 미국 뉴욕의 주식시장이 대폭락하여 자본주의 국가에 파급된 경제위기다. - (2번) 블랙프라이데이는 미국 최대규모의 쇼핑이 이루어진다는 날 - (4번) 블랙잉크는 레드잉크를 의미하는 적자의 반대말로 흑자를 의미한다.",
  };
  const examples = quizData.example;
  
  const clickAnswer = (e) => {
    const idx = e.target.id
    console.log(idx)
    // 클릭한뒤 결과제출하는 api 호출하고 거기서 데이터 저장후 
    // 정답인지 오답인지 데이터 변경해주고 navigate로 이동ㄱ
  }

  function QuizAnswer(quiz) {
    return (
      <div id={quiz.answerIdx} onClick={clickAnswer} className={classes.quizEx}>
        <p style={{ margin: "10px"}}>{quiz.answer}</p>
        
      </div>
    );
  }

  return (
    <div className={classes.quizBG}>
      <img style={{ marginLeft: "30px"}} onClick={backToList} src={`${process.env.PUBLIC_URL}/grayBack.svg`} alt="" />
      <div className={classes.quizCtn}>
        <div className={classes.quizCtnNv}>
          <div>
            <img src={`${process.env.PUBLIC_URL}/stock-list/quizIcon.svg`} alt="" />
          </div>
          <div style={{ marginTop: "26px" }}>
            <img
              src={`${process.env.PUBLIC_URL}/wallet/coin.svg`}
              style={{ width: 20, height: 20 }}
              alt=""
            />
            <span className={classes.fontani} style={{ marginLeft: "5px", marginRight: "20px", fontSize: "14px", fontWeight: "600", color: "#343838" }}>200,000</span>
          </div>
        </div>
        <div className={classes.quizbox}>

          <div className={classes.quizQ}>{quizData.question}</div>
          <div>
            {examples.map((quiz, index) => (
              <QuizAnswer key={quiz} answer={quiz} answerIdx={index}/>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
