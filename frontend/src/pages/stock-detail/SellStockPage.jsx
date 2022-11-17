import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./SellStockPage.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  shortStockGet,
  bidaskGet,
  stockSellPost,
} from "../../stores/stockSlice";
import { stockTradingPost } from "../../stores/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

function SellStockPage() {
  const params = useParams();
  const id = params.id;
  const [myStock, setMyStock] = useState(0);
  const tradeData = useSelector((state) => {
    return state.setStock.shortStockData;
  });
  const userData = useSelector((state) => {
    return state.persistedReducer.setUser.user;
  });
  const bidaskData = useSelector((state) => {
    return state.setStock.bidask;
  });
  useEffect(() => {
    userData.haveList?.forEach((element) => {
      if (element.ticker === id) {
        setMyStock(element.available);
      }
    });
  }, [userData]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(shortStockGet(id));
    dispatch(bidaskGet(id));
  }, []);
  const [isMarketPrice, setMarketPrice] = useState(true);
  const [wantedPrice, setWantedPrice] = useState("");
  const [wantedMany, setWantedMany] = useState("");
  const [writePrice, setWritePrice] = useState(false);
  const [isHave, setIsHave] = useState(true);
  const [isTooHigh, setIsTooHigh] = useState(false);
  const [isTooLow, setIsTooLow] = useState(false);
  const [total, setTotal] = useState(0);
  const [showAskingPrice, setShowAskingPrice] = useState(false);

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
          height: 350,
          width: 120,
          offsetX: 10,
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
          categories: [
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
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
          show: false,
          reversed: true,
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
          height: 350,
          width: 120,
          offsetX: 220,
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
          categories: [
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
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
          show: false,
          reversed: false,
          axisTicks: {
            show: false,
          },
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
            <ReactApexChart
              options={buyData.options}
              series={buyData.series}
              type="bar"
              height={200}
              width={120}
            />
            <div>
              {bidaskData.ask_pr.map((bid) => (
                <div>{bid.toLocaleString()}원</div>
              ))}
            </div>
            <div>
              {bidaskData.bid_pr.slice(0, 4).map((ask) => (
                <div>{ask.toLocaleString()}원</div>
              ))}
            </div>
            <ReactApexChart
              options={sellData.options}
              series={sellData.series}
              type="bar"
              height={200}
              width={120}
            />
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
        if (tempPrice > tradeData.maximum) {
          // 상한가보다 클때
          setIsTooHigh(true);
          setIsTooLow(false);
          setTimeout(() => {
            setIsTooHigh(false);
          }, 1000);
          if (Number(wantedPrice) <= tradeData.minimum) {
            setIsTooLow(true);
          }
          return;
        } else if (tempPrice < tradeData.minimum) {
          // 하한가보다 낮을때
          setIsTooLow(true);
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
        if (tempMany > myStock) {
          // 내가 가진것보다 팔려고 입력한게 클때
          setIsHave(false);
          setTimeout(() => {
            setIsHave(true);
          }, 1000);
          return;
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
    if (isMarketPrice) {
      return;
    } else {
      if (wantedPrice === "") {
        return (
          <span class={classes.buyNumber} onClick={priceClickHandler}>
            {writePrice && (
              <img
                className={classes.blinking}
                src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
                alt=""
              />
            )}
            <span class={classes.howMuchWant}>얼마에 팔고싶나요?</span>
          </span>
        );
      } else {
        return (
          <>
            <span class={classes.buyNumber} onClick={priceClickHandler}>
              {wantedPrice}
            </span>
            {writePrice && (
              <img
                className={classes.blinking}
                src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
                alt=""
              />
            )}
            <span class={classes.zuOrwon}>원</span>
          </>
        );
      }
    }
  }
  function ManyInput() {
    if (wantedMany === "") {
      return (
        <div class={classes.buyNumber} onClick={manyClickHandler}>
          {!writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <span class={classes.howMuchWant}>몇 주를 팔건가요?</span>
        </div>
      );
    } else {
      return (
        <>
          <div class={classes.buyNumber} onClick={manyClickHandler}>
            {wantedMany}
            {!writePrice && (
              <img
                className={classes.blinking}
                src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
                alt=""
              />
            )}
            <span class={classes.zuOrwon}>주</span>
          </div>
        </>
      );
    }
  }

  function submitOrder() {
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
      dispatch(stockSellPost(data));
      setTimeout(() => {
        backTo();
      }, 40);
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
          tr_type: "3",
        },
      };
      dispatch(stockTradingPost(data));
      setTimeout(() => {
        backTo();
      }, 40);
    }
  }

  const ration = tradeData.fluctuation_rate;
  return (
    <div>
      <div>
        <div className={classes.info}>
          <img
            className={classes.pd}
            src={`${process.env.PUBLIC_URL}/grayBack.svg`}
            alt=""
            onClick={backTo}
          />
          <div>
            <div>{tradeData.name}</div>
            <div>
              <span>{tradeData.price}</span>
              &nbsp;
              {ration >= 0 ? (
                <span style={{ color: "#DD4956" }}>(+{ration}%)</span>
              ) : (
                <span style={{ color: "#4D97ED" }}>({ration}%)</span>
              )}
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div class={classes.total}>
        <div class={classes.realPriceRadio}>
          {isMarketPrice ? (
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/stock-detail/checkedBox.svg`}
                alt=""
                onClick={checkBoxHandler}
              />
              &nbsp; &nbsp;
              <span>시장가로 즉시 판매</span>
            </div>
          ) : (
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/stock-detail/box.svg`}
                alt=""
                onClick={checkBoxHandler}
              />
              &nbsp; &nbsp;
              <span>시장가로 즉시 판매</span>
            </div>
          )}
          <button class={classes.hogaButton} onClick={handleOpen}>
            호가보기
          </button>
        </div>
        <PriceInput />
        <ManyInput />
        <div>{myStock}주 보유</div>
        {!isMarketPrice && isTooHigh === true && <p>그렇게 비싸겐 못팔아요</p>}
        {!isMarketPrice && isTooLow === true && isTooHigh === false && (
          <p>그렇게 싸겐 못팔아요</p>
        )}
        {!isHave && <p>판매 가능한 개수를 초과했어요!</p>}
      </div>
      <div class={classes.buyButtom}>
        <div class={classes.numberSection}>
          <div>
            <button
              value={1}
              class={classes.numberButton}
              onClick={numberClick}
            >
              1
            </button>
            <button
              value={2}
              class={classes.numberButton}
              onClick={numberClick}
            >
              2
            </button>
            <button
              value={3}
              class={classes.numberButton}
              onClick={numberClick}
            >
              3
            </button>
          </div>

          <div>
            <button
              value={4}
              class={classes.numberButton}
              onClick={numberClick}
            >
              4
            </button>
            <button
              value={5}
              class={classes.numberButton}
              onClick={numberClick}
            >
              5
            </button>
            <button
              value={6}
              class={classes.numberButton}
              onClick={numberClick}
            >
              6
            </button>
          </div>

          <div>
            <button
              value={7}
              class={classes.numberButton}
              onClick={numberClick}
            >
              7
            </button>
            <button
              value={8}
              class={classes.numberButton}
              onClick={numberClick}
            >
              8
            </button>
            <button
              value={9}
              class={classes.numberButton}
              onClick={numberClick}
            >
              9
            </button>
          </div>

          <div>
            <button class={classes.numberButton} id={classes.lastNumber}>
              ``
            </button>
            <button
              value={0}
              class={classes.numberButton}
              onClick={numberClick}
            >
              0
            </button>
            <button class={classes.numberButton} onClick={numberClick}>
              <img
                value="삭제"
                src={`${process.env.PUBLIC_URL}/stock-detail/eraser.svg`}
                alt=""
              />
            </button>
          </div>
        </div>

        <div class={classes.buyButtonDiv} onClick={submitOrder}>
          <button class={classes.buyButton}>
            팔래요
            <AskingGraphModal />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellStockPage;
