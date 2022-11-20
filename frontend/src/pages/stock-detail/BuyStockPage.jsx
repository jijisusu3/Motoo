import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import classes from "./BuyStockPage.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shortStockGet, bidaskGet } from "../../stores/stockSlice";
import { stockTradingPost, stockBuyPost } from "../../stores/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "800px",
  height: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

function BuyStockPage() {
  const params = useParams();
  const id = params.id;
  const tradeData = useSelector((state) => {
    return state.setStock.shortStockData;
  });
  const [isMarketPrice, setMarketPrice] = useState(true);
  const [wantedPrice, setWantedPrice] = useState("");
  const [wantedMany, setWantedMany] = useState("");
  const [writePrice, setWritePrice] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isTooHigh, setIsTooHigh] = useState(false);
  const [isTooLow, setIsTooLow] = useState(false);
  const [total, setTotal] = useState(0);
  const [showAskingPrice, setShowAskingPrice] = useState(false);

  const userData = useSelector((state) => {
    return state.persistedReducer.setUser.user;
  });
  const bidaskData = useSelector((state) => {
    return state.setStock.bidask;
  });
  const mySeed = userData.data.seed;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(shortStockGet(id));
    dispatch(bidaskGet(id));
  }, []);
  const navigate = useNavigate();
  function backTo() {
    navigate(-1);
  }
  const handleOpen = () => setShowAskingPrice(true);
  const handleClose = () => setShowAskingPrice(false);

  function AskingGraphModal() {
    const [buyData, setBuyData] = useState({
      series: [
        {
          data: bidaskData.ask_rsqn,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: "50%",
          width: 120,
          offsetX: -51,
          offsetY: 25,
          toolbar: {
            show: false,
          },
          selection: {
            enabled: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "14px",
            fontFamily: "Pretendard",
            fontWeight: 600,
            colors: ["000000"],
          },
        },
        xaxis: {
          show: false,
          categories: bidaskData.ask_pr,
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: {
          show: true,
          reversed: true,
          labels: {
            show: true,
            style: {
                fontSize: "14px",
                fontWeight: "bold",
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: function(val) {
              return Number(val).toLocaleString()+"원"
            }
        },
          axisTicks: {
            show: false,
          },
        },
        tooltip: {
          enabled: false,
        },
        colors: ["rgba(77, 151, 237, 0.75)"],
      },
    });
    const [sellData, setSellData] = useState({
      series: [
        {
          data: bidaskData.bid_rsqn,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: "50%",
          width: 120,
          offsetX: 51,
          offsetY: -20,
          toolbar: {
            show: false,
          },
          selection: {
            enabled: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "14px",
            fontFamily: "Pretendard",
            fontWeight: 600,
            colors: ["000000"],
          },
        },
        xaxis: {
          show: false,
          categories: bidaskData.bid_pr,
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: {
          show: true,
          reversed: false,
          axisTicks: {
            show: false,
          },
          labels: {
            show:true,
            style: {
              fontSize: "14px",
              fontWeight: "bold",
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: function(val) {
              return Number(val).toLocaleString()+"원"
            }
          }
         
        },
        tooltip: {
          enabled: false,
        },
        colors: ["rgba(221, 73, 86, 0.45)"],
      },
    });
    if (showAskingPrice) {
      return (
        <Modal
          open={showAskingPrice}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <button onClick={handleClose}>X</button> */}
            <div class={classes.words}>
              <p class={classes.thisMoney}>이 가격에</p>
              <br></br>
              <span class={classes.sellHoga}>팔려는 주식수</span>
              <span class={classes.buyHoga}>사려는 주식수</span>
            </div>
            <div class={classes.bidaskCharts}>
              <ReactApexChart
                options={buyData.options}
                series={buyData.series}
                type="bar"
                height={"40%"}
                width={185}
              />
              <ReactApexChart
                options={sellData.options}
                series={sellData.series}
                type="bar"
                height={"40%"}
                width={185}
              />
            </div>
          </Box>
        </Modal>
      );
    }
  }

  const numberClick = (event) => {
    setIsTooLow(false);
    const tempPrice = Number(wantedPrice + event.target.value);
    const tempMany = Number(wantedMany + event.target.value);
    // 가격 입력중일때
    if (writePrice) {
      if (Boolean(event.target.value)) {
        if (wantedPrice === "") {
          if (event.target.value === "0") {
            return;
          }
        }
        if (isMarketPrice) {
          return;
        }
        if (tempPrice > tradeData.price * 1.3) {
          // 상한가보다 클때
          setIsTooHigh(true);
          setIsTooLow(false);
          setTimeout(() => {
            setIsTooHigh(false);
          }, 1000);
          if (Number(wantedPrice) <= tradeData.price * 0.7) {
            setIsTooLow(true);
          }
          return;
        } else if (tempPrice < tradeData.price * 0.7) {
          // 하한가보다 낮을때
          setIsTooLow(true);
        }
        if (Boolean(wantedMany)) {
          //주식개수랑 가격입력모두되었을 때,
          if (tradeData.price * Number(wantedMany) > mySeed) {
            setIsAvailable(false);
            setTimeout(() => {
              setIsAvailable(true);
            }, 1000);
            return;
          } else {
            setIsAvailable(true);
            setTotal(tradeData.price * Number(wantedMany));
          }
        }
        setWantedPrice(wantedPrice + event.target.value);
      } else {
        if (wantedPrice !== "") {
          const tmp = wantedPrice.slice(0, -1);
          const tmpNum = Number(tmp);
          if (tmpNum < tradeData.price * 0.7) {
            // 하한가보다 낮을때
            setIsTooLow(true);
          }
          setWantedPrice(tmp);
        }
      }
    } else {
      // 주식개수 입력중일때
      if (Boolean(event.target.value)) {
        if (wantedMany === "") {
          if (event.target.value === "0") {
            return;
          }
        }
        if (Number(wantedPrice) * tempMany > mySeed) {
          setIsAvailable(false);
          setTimeout(() => {
            setIsAvailable(true);
          }, 1000);
          return;
        } else {
          if (tradeData.price * Number(wantedMany) > mySeed) {
            setIsAvailable(false);
            setTimeout(() => {
              setIsAvailable(true);
            }, 1000);
            return;
          } else {
            setIsAvailable(true);
            setTotal(tradeData.price * Number(wantedMany));
          }
        }
        setWantedMany(String(tempMany));
      } else {
        if (wantedMany !== "") {
          const tmp = wantedMany.slice(0, -1);
          setWantedMany(tmp);
        }
      }
    }
  };
  const checkBoxHandler = () => {
    setMarketPrice(!isMarketPrice);
    if (!isMarketPrice) {
      setWritePrice(false);
    } else {
      setWritePrice(true);
      setWantedPrice("");
    }
  };
  const priceClickHandler = () => {
    setWritePrice(true);
  };
  const manyClickHandler = () => {
    setWritePrice(false);
  };

  function PriceInput() {
    // 시장가로 즉시판매하겠다고 했을 때,
    if (isMarketPrice) {
      return;
    } else {
      // 직접입력하겠다고 할 때,
      if (wantedPrice === "") {
        return (
          <div className={classes.howmuch1} onClick={priceClickHandler}>
            {writePrice && (
              <img
                className={classes.blinking}
                src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
                alt="얼마에 사고싶나요?"
              />
            )}
            <span >얼마에 사고싶나요?</span>
          </div>
        );
      } else {
        return (
          <>
            <div className={classes.howmuch2} onClick={priceClickHandler}>
              {wantedPrice}
              {writePrice && (
                // <input type="text" class="rq-form-element" autofocus/>
                <img
                className={classes.blinking}
                src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
                alt=""
                />
                )}
              <span>원</span>
            </div>
          </>
        );
      }
    }
  }
  function ManyInput() {
    if (wantedMany === "") {
      return (
        <div className={classes.howmuch1} onClick={manyClickHandler}>
          {!writePrice && (
            // <input type="text" class="rq-form-element" placeholder="몇 주를 살건가요?" autofocus/>
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <span>몇 주를 살건가요?</span>
        </div>
      );
    } else {
      return (
        <>
          <div className={classes.howmuch2} onClick={manyClickHandler}>
            {wantedMany}
            {!writePrice && (
              <img
                className={classes.blinking}
                src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
                alt=""
              />
            )}
            <span>주</span>
          </div>
        </>
      );
    }
  }

  function submitOrder() {
    // 현재가로 주문, 개수입력
    if (isMarketPrice && Boolean(wantedMany)) {
      const data = {
        config: {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        },
        result: {
          accountId: Number(userData.data.current),
          amount: Number(wantedMany),
          price: Number(tradeData.price),
          stockId: Number(tradeData.id),
        },
      };
      dispatch(stockBuyPost(data));
      setTimeout(() => {
        backTo();
      }, 200);
    } else if (!isMarketPrice && Boolean(wantedMany) && !isTooLow) {
      const data = {
        config: {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        },
        result: {
          accountId: String(userData.data.current),
          amount: Number(wantedMany),
          price: Number(wantedPrice),
          stockId: String(tradeData.id),
          tr_type: "4",
        },
      };
      dispatch(stockTradingPost(data));
      setTimeout(() => {
        backTo();
      }, 200);
    }
  }

  const ration = tradeData.fluctuation_rate;

  return (
    <div>
      <div style={{marginBottom: "20px"}} className={classes.buynav}>
        <div>
          <img
            style={{ marginTop: "14px"}}
            src={`${process.env.PUBLIC_URL}/grayBack.svg`}
            alt=""
            onClick={backTo}
          />
        </div>
        <div>
          <p className={classes.buyname}>{tradeData.name}</p>
          <p className={classes.buyprice}>
            <span >{tradeData.price}</span>
            &nbsp;
            {ration >= 0 ? (
              <span style={{ color: "#DD4956" }}>(+{ration}%)</span>
            ) : (
              <span style={{ color: "#4D97ED" }}>({ration}%)</span>
            )}
          </p>
        </div>
        <div></div>
      </div>
      <hr />
      <div className={classes.bigctn}>

        <div className={classes.middlectn}>
          <div className={classes.middlesubctn}>
            <div className={classes.middlesubleft}>

              {isMarketPrice ? (
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/stock-detail/checkedBox.svg`}
                    alt=""
                    onClick={checkBoxHandler}
                  />
                  &nbsp; &nbsp;
                  <span className={classes.noworder}>현재가로 구매 주문</span>
                </div>
              ) : (
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/stock-detail/box.svg`}
                    alt=""
                    onClick={checkBoxHandler}
                  />
                  &nbsp; &nbsp;
                  <span className={classes.noworder}>현재가로 구매 주문</span>
                </div>
              )}
            </div>

            <PriceInput />

            <ManyInput />
            
            {mySeed && <div style={{ fontSize: "14px", marginTop: "5px", color: "#4E5E5E", fontWeight: "600"}}> 사용가능 금액 <img src={`${process.env.PUBLIC_URL}/wallet/vege.svg`} style={{ marginBottom: '2px', marginLeft: '2px', marginRight: '10px', width: 12, height: 12 }} alt="" /> <span style={{ color: "#43B8B1", fontWeight: "500"}}>{mySeed} 원</span></div>}
            <div class={classes.inputalrt}>          
              {!isMarketPrice && isTooHigh === true && <p>그렇게 비싸겐 못사요</p>}
              {!isMarketPrice && isTooLow === true && isTooHigh === false && (
                <p>그렇게 싸겐 못사요</p>
              )}
              {!isAvailable && <p>사용 가능한 금액을 초과했어요!</p>}
            </div>
          </div>
          <div>
            <button class={classes.callwatch} onClick={handleOpen}>
              호가보기
            </button>
          </div>
        </div>

        <div className={classes.numberctn}>
          <div className={classes.numberbtns}>
            <div>
              <button
                className={classes.numberbtn}
                value={1}
                onClick={numberClick}
              >
                1
              </button>
              <button
                className={classes.numberbtn}
                value={2}
                onClick={numberClick}
              >
                2
              </button>
              <button
                className={classes.numberbtn}
                value={3}
                onClick={numberClick}
              >
                3
              </button>
            </div>

            <div>
              <button
                className={classes.numberbtn}
                value={4}
                onClick={numberClick}
              >
                4
              </button>
              <button
                className={classes.numberbtn}
                value={5}
                onClick={numberClick}
              >
                5
              </button>
              <button
                className={classes.numberbtn}
                value={6}
                onClick={numberClick}
              >
                6
              </button>
            </div>

            <div>
              <button
                className={classes.numberbtn}
                value={7}
                onClick={numberClick}
              >
                7
              </button>
              <button
                className={classes.numberbtn}
                value={8}
                onClick={numberClick}
              >
                8
              </button>
              <button
                className={classes.numberbtn}
                value={9}
                onClick={numberClick}
              >
                9
              </button>
            </div>

            <div>
              <button style={{color:"white"}} className={classes.numberbtn}>
                0
              </button>
              <button
                className={classes.numberbtn}
                value={0}
                onClick={numberClick}
              >
                0
              </button>
              <button className={classes.numberbtn} onClick={numberClick}>
                <img
                  value="삭제"
                  src={`${process.env.PUBLIC_URL}/stock-detail/eraser.svg`}
                  alt=""
                />
              </button>
            </div>
            <div onClick={submitOrder}>
              <button className={classes.sellbutton}>
                살래요
              </button>
            </div>
          </div>

        </div>
      </div>
      <AskingGraphModal />
    </div>
  );
}

export default BuyStockPage;
