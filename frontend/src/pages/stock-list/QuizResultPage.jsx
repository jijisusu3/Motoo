import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNav } from "../../stores/navSlice";
import { useNavigate } from "react-router-dom";
import classes from './QuizPage.module.css'
import { useParams } from "react-router-dom";

function QuizResultPage() {
  const dispatch = useDispatch()
  const params = useParams();
  const id = params.result;
  const [quizResult, setQuizResult] = useState(true)
  const quizData = useSelector((state) => {
    return state.persistedReducer.setUser.quizData
  })
  var examples = []
  if (quizData.examples) {
    examples = quizData.examples.split(':');
  }
  useEffect(() => {
    dispatch(setActiveNav(1))
  }, [])
  useEffect(() => {
    if (id === "1"){
      setQuizResult(true)
    } else {
      setQuizResult(false)
    }
  }, [quizResult])
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
        {quizData && (
          <div className={classes.quizresbox}>
            <div style={{ fontSize: "13px",  color: "#929E9E", marginBottom: "20px" }}>{quizData.question}</div>
            <div className={classes.quizans}>{examples[quizData.answer]}</div>
            <div style={{   fontWeight: "600" }}>{quizData.explanation}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizResultPage;