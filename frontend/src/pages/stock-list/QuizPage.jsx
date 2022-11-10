import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNav } from "../../stores/navSlice";
import { useNavigate } from "react-router-dom";
import classes from './QuizPage.module.css'
import { quizPut, quizGet } from '../../stores/userSlice'

function QuizPage() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => {
    return state.persistedReducer.setUser.user.token;
  })
  const quizData = useSelector((state) => {
    return state.persistedReducer.setUser.quizData
  })
  console.log(quizData)

  useEffect(() => {
    dispatch(setActiveNav(1));
  },[]);

  useEffect(() => {
    if (userToken){
      const data = userToken
      dispatch(quizGet(data))
    }
  }, [userToken])
  const navigate = useNavigate();
  function backToList() {
    navigate('/');
  }
  // 데이터 전역으로 저장해두기
  var examples = []
  if (quizData.examples) {
    examples = quizData.examples.split(':');
  }
  
  const clickAnswer = (e) => {
    const idx = e.target.id
    const data = {
      config : {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      },
      quizResult : {
        answer : idx,
        id : quizData.quizId
      }
    }
    dispatch(quizPut(data))
    
    if (Number(idx) === quizData.answer) {
      navigate("/quiz-result/1")
    } else {
      navigate("/quiz-result/2")
    }
    // 클릭한뒤 결과제출하는 api 호출하고 거기서 데이터 저장후 
    // 정답인지 오답인지 데이터 변경해주고 navigate로 이동ㄱ
  }

  function QuizAnswer(quiz) {
    return (
      <div id={quiz.answerIdx} onClick={clickAnswer} className={classes.quizEx}>
        <p id={quiz.answerIdx} onClick={clickAnswer} style={{ margin: "10px"}}>{quiz.answer}</p>
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
          {quizData.question && (
            <div className={classes.quizQ}>{quizData.question}</div>
          )}
          <div>
            {examples && examples.map((quiz, index) => (
              <QuizAnswer key={quiz} answer={quiz} answerIdx={index}/>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
