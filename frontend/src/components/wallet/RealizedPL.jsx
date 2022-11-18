import React, { useState, useEffect } from "react";
import "./RealizedPL.module.css";
// import RealizedList from "./RealizedList";
import classes from "./RealizedPL.module.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import datejs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
datejs.extend(isBetween);

function RealizedPL() {
  const realizedData = useSelector((state) => {
    return state.setAccount.accountDetail.tradingProfitLoss;
  });
  const [data, setData] = useState([
    {
      priceHigh: [],
    },
    {
      profitHigh: [],
    },
  ]);
  useEffect(() => {
    try {
      setExample(realizedData["stockOrderByTradingPL"]);
      data[0]["priceHigh"] = realizedData["stockOrderByTradingPL"];
      data[1]["profitHigh"] = realizedData["stockOrderByTradingPLRatio"];
    } catch (err) {
      return;
    }
  }, [realizedData]);
  const [timeList, setTimeList] = useState(data);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // 날짜 검색 필터링
  function GetCalenderData() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const postBody = {
        startChoice: `${startDate.getFullYear()}-${(
          "00" +
          (startDate.getMonth() + 1)
        )
          .toString()
          .slice(-2)}-${("00" + startDate.getDate()).toString().slice(-2)}`,
        endChoice: `${endDate.getFullYear()}-${("00" + (endDate.getMonth() + 1))
          .toString()
          .slice(-2)}-${("00" + endDate.getDate()).toString().slice(-2)}`,
      };
      const newList = [
        {
          priceHigh: [],
        },
        {
          profitHigh: [],
        },
      ];
      const categoryList = ["priceHigh", "profitHigh"];
      var count = 0;
      for (var i of categoryList) {
        if (data[count][i].length > 0) {
          for (var j of data[count][i]) {
            const tmpDate = j["tradingDate"].slice(0, 10);
            var stockDate = datejs(tmpDate, "YYYY-MM-DD");
            if (
              stockDate.isBetween(
                postBody["startChoice"],
                postBody["endChoice"],
                undefined,
                "[]"
              )
            ) {
              newList[count][i].push(j);
            }
          }
        }
        count += 1;
      }
      setTimeList(newList);
      setExample(newList[0]["priceHigh"]);
    };

    function dateRefresh() {
      setTimeList(data);
      setExample(data[0]["priceHigh"]);
      setStartDate();
      setEndDate();
    }
    return (
      <div className={classes.calender}>
        <div>
          <img
            style={{
              marginLeft: "12px",
              marginRight: "6px",
              marginBottom: "2px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
            }}
            className={classes.imgs}
            src={`${process.env.PUBLIC_URL}/wallet/calendar.svg`}
            alt=""
          />
        </div>
        <form className={classes.formbox} method="post" onSubmit={handleSubmit}>
          <div className={classes.dateipt}>
            <div className={classes.wrap}>
              <DatePicker
                className={classes.tag}
                required
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div style={{ color: "#929E9E", marginLeft: "2.5px" }}>-</div>
            <div
              className={classes.wrap}
              style={{ marginLeft: "5px", marginRight: "5px" }}
            >
              <DatePicker
                className={classes.tag}
                required
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
              />
            </div>
            <div>
              <button className={classes.search}>찾기</button>
            </div>
            <div>
              <img
                style={{
                  marginTop: "2px",
                  marginLeft: "10px",
                  width: "16px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                }}
                className={classes.imgs}
                onClick={dateRefresh}
                src={`${process.env.PUBLIC_URL}/wallet/dateRefresh.svg`}
                alt=""
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
  // 드롭다운 value기준 정렬
  const [example, setExample] = useState(timeList[0]["priceHigh"]);
  function RealizedList() {
    const [value, setValue] = useState("1");
    const [data, setData] = useState(timeList);

    function setDropdownData(value) {
      if (value === "1") {
        setExample(data[0]["priceHigh"]);
      } else {
        setExample(data[1]["profitHigh"]);
      }
    }
    const handleValueChange = (event) => {
      setValue(event.target.value);
      setDropdownData(event.target.value);
    };

    function MyRealizedCard(stock) {
      function profitCheck() {
        if (stock.profit < 0) {
          return "#4D97ED";
        } else {
          return "#DD4956";
        }
      }
      const profitColor = profitCheck();
      return (
        <div className={classes.myRealizedCard}>
          <div className={classes.abovebox}>
            <div className={classes.stname}>{stock.name}</div>
            <div>
              <div className={classes.rowbox}>
                <div className={classes.rowbox}>
                  <img
                    src={`${process.env.PUBLIC_URL}/wallet/coin.svg`}
                    style={{ width: 12, height: 12 }}
                    alt=""
                  />
                  <div className={classes.result}>평가손익</div>
                </div>
                <div className={classes.section} style={{ color: profitColor }}>
                  {stock.profit.toLocaleString()}
                </div>
              </div>
              <div className={classes.rowbox}>
                <div className={classes.rowbox}>
                  <img
                    src={`${process.env.PUBLIC_URL}/wallet/chart.svg`}
                    style={{ width: 12, height: 12 }}
                    alt=""
                  />
                  <div className={classes.result}>수익률</div>
                </div>
                <div className={classes.section} style={{ color: profitColor }}>
                  {stock.percent.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
          <div className={classes.belowbox}>
            <div className={classes.infobox}>
              평균구매가
              <div className={classes.numbox}>
                <p className={classes.txts}>{stock.mean.toLocaleString()}</p>원
              </div>
            </div>
            <div className={classes.infobox}>
              판매가
              <div className={classes.numbox}>
                <p className={classes.txts}>{stock.now.toLocaleString()}</p>원
              </div>
            </div>
            <div className={classes.infobox}>
              수량
              <div className={classes.numbox}>
                <p className={classes.txts}>{stock.many}</p>주
              </div>
            </div>
            <div className={classes.infobox}>
              평가금액
              <div className={classes.numbox}>
                <p className={classes.txts}>{stock.all.toLocaleString()}</p>원
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <FormControl
          sx={{ minWidth: 120, marginTop: "30px" }}
          size="small"
          focused={0}
        >
          <Select
            className={classes.sltbox}
            labelId="demo-select-small"
            id="demo-select-small"
            value={value}
            onChange={handleValueChange}
            sx={{
              boxShadow: "none",
              border: 0,
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
            }}
          >
            <MenuItem value={"1"}>
              <Typography
                fontSize={"14px"}
                fontWeight={"500"}
                color={"#474747"}
                fontFamily="Pretendard"
              >
                손익 높은순
              </Typography>
            </MenuItem>
            <MenuItem value={"2"}>
              <Typography
                fontSize={"14px"}
                fontWeight={"500"}
                color={"#474747"}
                fontFamily="Pretendard"
              >
                수익률높은순
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>
        <div className={classes.listbox}>
          {example &&
            example.map((stock, index) => (
              <MyRealizedCard
                key={index}
                name={stock.stockName}
                profit={stock.tradingPL}
                percent={stock.tradingPLRatio}
                mean={stock.avgPrice}
                now={stock.price}
                many={stock.amount}
                all={stock.totalTradingPrice}
              />
            ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className={classes.cldbox}>
        <GetCalenderData />
      </div>
      <RealizedList />
    </>
  );
}

export default RealizedPL;
