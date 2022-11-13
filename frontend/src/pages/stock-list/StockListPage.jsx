import { useNavigate } from "react-router-dom";
import classes from "./StockListPage.module.css";
import { useState, useEffect } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav } from "../../stores/navSlice";
import { realtimeGet, likeListGet } from "../../stores/stockSlice";


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <p>{children}</p>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function StockListPage() {
  const [value, setValue] = useState(0);
  const [orderMany, setOrderMany] = useState(8);
  const [myListEdit, setMyListEdit] = useState(false);
  const [realtimeValue, setRealtimeValue] = useState(0);

  const userToken = useSelector((state) => {
    return state.persistedReducer.setUser.user.token;
  });
  const userQuiz = useSelector((state) => {
    return state.persistedReducer.setUser.user.quizDay;
  });
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    let date = new Date();
    const now = `${date.getFullYear()}-${("00" + (date.getMonth() + 1))
      .toString()
      .slice(-2)}-${("00" + date.getDate()).toString().slice(-2)}`;
    let getDay = ""
    if (userQuiz){
      getDay = userQuiz.substr(0,10)
    }
    if (now === getDay) {
      setIsSolved(true)
    }
  }, [userQuiz])
  useEffect(() => {
    dispatch(realtimeGet())
    const data = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
    dispatch(likeListGet(data))
  }, [])

  const goToDetail = (e) => {
    const isPk = e.target.id;
    if (Boolean(isPk)) {
      navigate(`/stock/detail/${isPk}`);
    }
  };

  function disLike(id){
    console.log(id)
  }

  const dispatch = useDispatch();
  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
  }, []);

  // 삭제버튼 누르면 해당함수 실행,
  // BE에 삭제요청 보내고, 해당페이지재구성하고,
  // 유저정보 관심주식리스트 업데이트 되어야함
  function deleteSubmit() {
    // eventTarget으로 어떤 아이디 클릭된건지 인식해야함
    // const data = { token: userToken, id: id };
  }

  const likeList = useSelector((state) => {
    return state.setStock.likeList
  })
  
  const realtimeData = useSelector((state) => {
    return state.setStock.realtime
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      setMyListEdit(false);
    } else {
      setRealtimeValue(0);
    }
  };

  const realtimeListHandleChange = (event, newValue) => {
    setRealtimeValue(newValue);
  };
  const navigate = useNavigate();
  function GoToSearch() {
    navigate(`/stock/search`);
  }
  function GoToOrderListPage() {
    navigate(`/stock/limit-order`);
  }
  function GoToQuizPage() {
    navigate(`/quiz`);
  }
  const editStart = () => {
    setMyListEdit(true);
  };
  const editFinish = () => {
    setMyListEdit(false);
  };

  function RealtimeCard(stock) {
    function profitCheck() {
      if (stock.profit < 0) {
        return "#4D97ED";
      } else {
        return "#DD4956";
      }
    }
    const profitColor = profitCheck();
    return (
      <div>
        <div className={classes.lists}>
          <div className={classes.listcard}>
            <div className={classes.rank}>{stock.ranking}</div>
            <div id={stock.code} onClick={goToDetail}>
              {stock.name}
            </div>
          </div>
          <div className={classes.nowpr}>
            <div style={{ color: profitColor, fontSize: 16 }}>
              {stock.profit}%
            </div>
            <div>{stock.price}원</div>
          </div>
        </div>
        <div className={classes.hrline}></div>
      </div>
    );
  }

  function RealtimeLists() {
    const selectedString = [
      "rate_up",
      "rate_down",
      "capital_up",
      "volume_up",
    ];
    const selectedRealtimeData =
      realtimeData[realtimeValue][selectedString[realtimeValue]];
    return (
      <div
        className={classes.listbox}
        style={{ backgroundColor: "white", paddingTop: 20 }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <div className={classes.tabbox}>
              <Tabs
                value={realtimeValue}
                onChange={realtimeListHandleChange}
                aria-label="basic tabs example"
                sx={{
                  "& .MuiTabs-indicator": { bgcolor: "#FEBF45", height: 3 },
                }}
              >
                <Tab
                  label={
                    <Typography
                      fontSize="4vw"
                      fontWeight="600"
                      color={realtimeValue === 0 ? "#000" : "#929E9E"}
                      fontFamily="Pretendard"
                    >
                      급상승
                    </Typography>
                  }
                  sx={{
                    "&.Mui-selected": {
                      color: "rgba(0, 0, 0, 0)",
                    },
                    // paddingX: '3%',
                    minWidth: "10%",
                  }}
                />
                <Tab
                  label={
                    <Typography
                      fontSize="4vw"
                      fontWeight="600"
                      color={realtimeValue === 1 ? "#000" : "#929E9E"}
                      fontFamily="Pretendard"
                    >
                      급하락
                    </Typography>
                  }
                  sx={{
                    "&.Mui-selected": {
                      color: "rgba(0, 0, 0, 0)",
                    },
                    // paddingX: '3%',
                    minWidth: "10%",
                  }}
                />
                <Tab
                  label={
                    <Typography
                      fontSize="4vw"
                      fontWeight="600"
                      color={realtimeValue === 2 ? "#000" : "#929E9E"}
                      fontFamily="Pretendard"
                    >
                      시가총액
                    </Typography>
                  }
                  sx={{
                    "&.Mui-selected": {
                      color: "rgba(0, 0, 0, 0)",
                    },
                    // paddingX: '3%',
                    minWidth: "10%",
                  }}
                />
                <Tab
                  label={
                    <Typography
                      fontSize="4vw"
                      fontWeight="600"
                      color={realtimeValue === 3 ? "#000" : "#929E9E"}
                      fontFamily="Pretendard"
                    >
                      거래량
                    </Typography>
                  }
                  sx={{
                    "&.Mui-selected": {
                      color: "rgba(0, 0, 0, 0)",
                    },
                    // paddingX: '3%',
                    minWidth: "10%",
                  }}
                />
              </Tabs>
            </div>
          </Box>
        </Box>
        {selectedRealtimeData && selectedRealtimeData.map((stock, index) => (
          <RealtimeCard
            key={stock.ticker}
            name={stock.name}
            code={stock.ticker}
            ranking={index + 1}
            profit={stock.fluctuation_rate}
            price={stock.price}
          />
        ))}
      </div>
    );
  }

  function MyWishCard(stock) {
    if (!myListEdit) {
      // 수정중 아닐때
      function profitCheck() {
        if (stock.profit < 0) {
          return "#4D97ED";
        } else {
          return "#DD4956";
        }
      }
      const profitColor = profitCheck();
      return (
        <div>
          <div className={classes.lists}>
            <div id={stock.ticker} onClick={goToDetail}>
              {stock.name}
            </div>
            <div className={classes.nowpr}>
              <div style={{ color: profitColor, fontSize: 16 }}>
                {stock.profit}%
              </div>
              <div>{stock.price}원</div>
            </div>
          </div>
          <div className={classes.hrline}></div>
        </div>
      );
    } else {
      //수정중일때
      return (
        <div>
          <div className={classes.eleslists}>
            <div>{stock.name}</div>
            <img
              onClick={() => disLike(stock.id)}
              src={`${process.env.PUBLIC_URL}/stock-list/wishListDelete.svg`}
              alt=""
            />
          </div>
          <div className={classes.hrline}></div>
        </div>
      );
    }
  }

  function LimitOrder() {
    return (
      <div onClick={GoToOrderListPage} className={classes.limitOrderCard}>
        <div className={classes.nametag}>
          <img
            className={classes.imgs}
            src={`${process.env.PUBLIC_URL}/stock-list/waitingListIcon.svg`}
            alt=""
          />
          <div>대기중인 주식 목록</div>
        </div>
        <div className={classes.nametag}>
          <img
            className={classes.arrow}
            src={`${process.env.PUBLIC_URL}/stock-list/goTo.svg`}
            alt=""
          />
        </div>
      </div>
    );
  }
  function QuizAndLimitOrder() {
    return (
      <div>
        <div onClick={GoToOrderListPage} className={classes.limitOrderCard}>
          <div className={classes.nametag}>
            <img
              className={classes.imgs}
              src={`${process.env.PUBLIC_URL}/stock-list/waitingListIcon.svg`}
              alt=""
            />
            <div>대기중인 주식 목록</div>
          </div>
          <div className={classes.nametag}>
            <img
              className={classes.arrow}
              src={`${process.env.PUBLIC_URL}/stock-list/goTo.svg`}
              alt=""
            />
          </div>
        </div>
        <div onClick={GoToQuizPage} className={classes.limitOrderCard}>
          <div className={classes.nametag}>
            <img
              className={classes.imgs}
              src={`${process.env.PUBLIC_URL}/wallet/coin.svg`}
              alt=""
            />
            <div>오늘의퀴즈</div>
          </div>
          <div className={classes.nametag}>
            <div>200,000원</div>
            <img
              className={classes.arrow}
              src={`${process.env.PUBLIC_URL}/stock-list/goTo.svg`}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }

  function MyStockList() {
    return (
      <div className={classes.listbox}>
        <div className={classes.editbox}>
          <div className={classes.favorite}>
            <div>관심주식</div>
            <img
              className={classes.star}
              src={`${process.env.PUBLIC_URL}/stock-list/myStar.svg`}
              alt=""
            />
          </div>
          {myListEdit ? (
            <div onClick={editFinish}>완료</div>
          ) : (
            <div onClick={editStart}>편집</div>
          )}
        </div>
        {likeList && likeList.map((stock) => (
          <MyWishCard
            key={stock.ticker}
            name={stock.name}
            ticker={stock.ticker}
            profit={stock.fluctuation_rate}
            price={stock.price}
            id={stock.id}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "#EAF0EF" }}>
        <div className={classes.header}>
          <img
            className={classes.logo}
            src={`${process.env.PUBLIC_URL}/stock-list/motoologo.png`}
            alt=""
          />
          <img
            onClick={GoToSearch}
            src={`${process.env.PUBLIC_URL}/stock-list/stockListSearchIcon.svg`}
            alt=""
          />
        </div>
        <div className={classes.bodybox}>
          {isSolved ? <LimitOrder /> : <QuizAndLimitOrder />}
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <Tabs
              className={classes.tabs}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ "& .MuiTabs-indicator": { bgcolor: "#EAF0EF" } }}
            >
              <Tab
                label={
                  <Typography
                    fontSize="3vh"
                    fontWeight="600"
                    color={value === 0 ? "#43B8B1" : "#929E9E"}
                    fontFamily="Pretendard"
                  >
                    내 리스트
                  </Typography>
                }
                {...a11yProps(0)}
                sx={{
                  "&.Mui-selected": {
                    color: "rgba(0, 0, 0, 0)",
                  },
                }}
              />
              <Tab
                label={
                  <Typography
                    fontSize="3vh"
                    fontWeight="600"
                    color={value === 1 ? "#43B8B1" : "#929E9E"}
                    fontFamily="Pretendard"
                  >
                    실시간 차트
                  </Typography>
                }
                sx={{
                  "&.Mui-selected": {
                    color: "rgba(0, 0, 0, 0)",
                  },
                }}
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <MyStockList />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RealtimeLists />
          </TabPanel>
        </Box>
      </div>
    </>
  );
}

export default StockListPage;
