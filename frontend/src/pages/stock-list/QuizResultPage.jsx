import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNav } from "../../stores/navSlice";
import { useNavigate } from "react-router-dom";

function QuizResultPage() {
  const dispatch = useDispatch()
  // 데이터 전역으로 저장해두기
  const quizResult = true
  const quizData = {
    question: "이게뭘까요?????",
    example: ["내가 어떻게 알까", "그거입니다", "저거입니다", "ㅎㅎㅎㅎㅎ"],
    answer: 2,
    explanation: "이러이러한 이유로 정답은 저거입니다.",
  };
  useEffect(() => {
    dispatch(setActiveNav(1))
  })
  const navigate = useNavigate();
  function backToList() {
    navigate('/');
  }
  return (
    <div>
      <img onClick={backToList} src={`${process.env.PUBLIC_URL}/grayBack.svg`} alt="" />
      {quizResult ? (
        <div style={{backgroundColor:'grey'}}>
          <img src={`${process.env.PUBLIC_URL}/stock-list/correct.svg`} alt="" />
          <h1>정답입니다!</h1>
          <img src={`${process.env.PUBLIC_URL}/wallet/coin.svg`} style={{width:24, height:24}}alt="" />
          <div>200,000원 획득!</div>
        </div>
      ):(
        <div style={{backgroundColor:'grey'}}>
          <img src={`${process.env.PUBLIC_URL}/stock-list/wrong.svg`} alt="" />
          <h1>오답입니다!</h1>
          <img src={`${process.env.PUBLIC_URL}/wallet/coin.svg`} style={{width:24, height:24}}alt="" />
          <div>0 원 획득!</div>
        </div>
      )}
      <div style={{backgroundColor: 'blueviolet'}}>
        <div>{quizData.question}</div>
        <div style={{backgroundColor:'white'}}>{quizData.example[quizData.answer]}</div>
        <div>{quizData.explanation}</div>
      </div>
    </div>
  );
}

export default QuizResultPage;