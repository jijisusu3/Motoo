import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveNav } from "../../stores/navSlice";
import { useNavigate } from "react-router-dom";

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
    question: "이게뭘까요?????",
    example: ["내가 어떻게 알까", "그거입니다", "저거입니다", "ㅎㅎㅎㅎㅎ"],
    answer: 3,
    explanation: "이러이러한 이유로 정답은 저거입니다.",
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
      <div id={quiz.answerIdx} onClick={clickAnswer} style={{ border: "1px solid blue", backgroundColor: "white" }}>
        {quiz.answer}
      </div>
    );
  }

  return (
    <div>
      <img onClick={backToList} src={`${process.env.PUBLIC_URL}/grayBack.svg`} alt="" />
      <h1>퀴즈 내는 페이지</h1>
      <img src={`${process.env.PUBLIC_URL}/stock-list/quizIcon.svg`} alt="" />
      <img
        src={`${process.env.PUBLIC_URL}/wallet/coin.svg`}
        style={{ width: 20, height: 20 }}
        alt=""
      />
      <span>200,000원</span>
      <div style={{ border: "1px solid black", backgroundColor: "red" }}>
        <div>{quizData.question}</div>
        {examples.map((quiz, index) => (
          <QuizAnswer key={quiz} answer={quiz} answerIdx={index}/>
        ))}
      </div>
    </div>
  );
}

export default QuizPage;
