import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "./BuyStockPage.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReactApexChart from "react-apexcharts";

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

function BuyStockPage() {
  const mySeed = 10000000;
  const location = useLocation();
  const tradeData = location.state?.data;
  const [isMarketPrice, setMarketPrice] = useState(true);
  const [nowPrice, setNowPrice] = useState(tradeData.nowPrice);
  const [wantedPrice, setWantedPrice] = useState("");
  const [wantedMany, setWantedMany] = useState("");
  const [writePrice, setWritePrice] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isTooHigh, setIsTooHigh] = useState(false);
  const [isTooLow, setIsTooLow] = useState(false);
  const [total, setTotal] = useState(0);
  const [showAskingPrice, setShowAskingPrice] = useState(false);

  const handleOpen = () => setShowAskingPrice(true);
  const handleClose = () => setShowAskingPrice(false);

  function AskingGraphModal() {
    const [buyData, setBuyData] = useState({
      series: [
        {
          data: [2890, 2211, 1100, 900, 201],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          width: 120,
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
          data: [2890, 2211, 1100, 900, 201],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          width: 120,
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
            <button onClick={handleClose}>X</button>
            <p>이가격에</p>
            <p>팔려는 주식수</p>
            <p>사려는 주식수</p>
            <ReactApexChart
              options={buyData.options}
              series={buyData.series}
              type="bar"
              height={180}
              width={120}
            />
            <ReactApexChart
              options={sellData.options}
              series={sellData.series}
              type="bar"
              height={180}
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
        if (tempPrice > nowPrice * 1.3) {
          // 상한가보다 클때
          setIsTooHigh(true);
          setTimeout(() => {
            setIsTooHigh(false);
          }, 1000);
          return;
        } else if (tempPrice < nowPrice * 0.7) {
          // 하한가보다 낮을때
          setIsTooLow(true);
        }
        if (Boolean(wantedMany)) {
          //주식개수랑 가격입력모두되었을 때,
          if (tempPrice * Number(wantedMany) > mySeed) {
            setIsAvailable(false);
            setTimeout(() => {
              setIsAvailable(true);
            }, 1000);
            return;
          } else {
            setIsAvailable(true);
            setTotal(tempPrice * Number(wantedMany));
            console.log(typeof total);
          }
        }
        setWantedPrice(wantedPrice + event.target.value);
      } else {
        if (wantedPrice !== "") {
          const tmp = wantedPrice.slice(0, -1);
          const tmpNum = Number(tmp);
          if (tmpNum < nowPrice * 0.7) {
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
          if (nowPrice * Number(wantedMany) > mySeed) {
            setIsAvailable(false);
            setTimeout(() => {
              setIsAvailable(true);
            }, 1000);
            return;
          } else {
            setIsAvailable(true);
            setTotal(nowPrice * Number(wantedMany));
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
    console.log("가격누름");
    setWritePrice(true);
  };
  const manyClickHandler = () => {
    console.log("개수누름");
    setWritePrice(false);
  };
  function PriceInput() {
    // 시장가로 즉시판매하겠다고 했을 때,
    if (isMarketPrice) {
      return <h1 onClick={priceClickHandler}>{nowPrice}원</h1>;
    } else {
      // 직접입력하겠다고 할 때,
      if (wantedPrice === "") {
        return (
          <div onClick={priceClickHandler}>
            {writePrice && (
              <img
                className={classes.blinking}
                src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
                alt=""
              />
            )}
            <h1>얼마에 사고싶나요?</h1>
          </div>
        );
      } else {
        return (
          <>
            <span onClick={priceClickHandler}>{wantedPrice}</span>
            {writePrice && (
              <img
                className={classes.blinking}
                src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
                alt=""
              />
            )}
            <span>원</span>
          </>
        );
      }
    }
  }
  function ManyInput() {
    if (wantedMany === "") {
      return (
        <div onClick={manyClickHandler}>
          {!writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <h1>몇 주를 살건가요?</h1>
        </div>
      );
    } else {
      return (
        <>
          <p onClick={manyClickHandler}>{wantedMany}</p>
          {!writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <span>주</span>
        </>
      );
    }
  }
  return (
    <div>
      <h1>{tradeData.name}</h1>
      {isMarketPrice ? (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/stock-detail/checkedBox.svg`}
            alt=""
            onClick={checkBoxHandler}
          />
          <p>시장가로 즉시 구매</p>
        </div>
      ) : (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/stock-detail/box.svg`}
            alt=""
            onClick={checkBoxHandler}
          />
          <p>시장가로 즉시 구매</p>
        </div>
      )}
      <button onClick={handleOpen}>호가보기</button>
      <PriceInput />
      <ManyInput />
      {isTooHigh && <p>그렇게 비싸겐 못사요</p>}
      {isTooLow && <p>그렇게 싸겐 못사요</p>}
      {!isAvailable && <p>넌 그만큼 살 돈이 없어요</p>}
      <div class="numberSection">
        <button value={1} class="number" onClick={numberClick}>
          1
        </button>
        <button value={2} class="number" onClick={numberClick}>
          2
        </button>
        <button value={3} class="number" onClick={numberClick}>
          3
        </button>
        <button value={4} class="number" onClick={numberClick}>
          4
        </button>
        <button value={5} class="number" onClick={numberClick}>
          5
        </button>
        <button value={6} class="number" onClick={numberClick}>
          6
        </button>
        <button value={7} class="number" onClick={numberClick}>
          7
        </button>
        <button value={8} class="number" onClick={numberClick}>
          8
        </button>
        <button value={9} class="number" onClick={numberClick}>
          9
        </button>
        <button value={0} class="number" onClick={numberClick}>
          0
        </button>
        <button class="number" onClick={numberClick}>
          <img
            value="삭제"
            src={`${process.env.PUBLIC_URL}/stock-detail/eraser.svg`}
            alt=""
          />
        </button>
      </div>
      <AskingGraphModal />
    </div>
  );
}

export default BuyStockPage;