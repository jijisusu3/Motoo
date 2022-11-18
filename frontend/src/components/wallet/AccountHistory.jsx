import React, { useState, useEffect } from "react";
import "./RealizedPL.module.css";
// import RealizedList from "./RealizedList";
import classes from "./AccountHistory.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import datejs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
datejs.extend(isBetween);

function AccountHistory() {
  const accountHistoryData = useSelector((state) => {
    return state.setAccount.accountDetail.tradingHistory;
  });
  const [data, setData] = useState([
    {
      all: [],
    },
    {
      buy: [],
    },
    {
      cash: [],
    },
    {
      sell: [],
    },
    {
      stock: [],
    },
  ]);
  useEffect(() => {
    try {
      setExample(accountHistoryData.allTradingHistory);
      data[0]["all"] = accountHistoryData.allTradingHistory;
      data[1]["buy"] = accountHistoryData.buyTradingHistory;
      data[2]["cash"] = accountHistoryData.cashHistory;
      data[3]["sell"] = accountHistoryData.sellTradingHistory;
      data[4]["stock"] = accountHistoryData.stockTradingHistory;
    } catch (err) {
      return;
    }
  }, [accountHistoryData]);
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
          all: [],
        },
        {
          buy: [],
        },
        {
          cash: [],
        },
        {
          sell: [],
        },
        {
          stock: [],
        },
      ];
      const categoryList = ["all", "buy", "cash", "sell", "stock"];
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
      setExample(newList[0]["all"]);
    };
    function dateRefresh() {
      setTimeList(data);
      setExample(data[0]["all"]);
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
            <div className="section">
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
  const [example, setExample] = useState(timeList[0]["all"]);
  function RealizedList() {
    const [value, setValue] = useState("1");
    const [data, setData] = useState(timeList);
    function setDropdownData(value) {
      if (value === "1") {
        setExample(data[0]["all"]);
      } else if (value === "2") {
        setExample(data[1]["buy"]);
      } else if (value === "3") {
        setExample(data[2]["cash"]);
      } else if (value === "4") {
        setExample(data[3]["sell"]);
      } else {
        setExample(data[4]["stock"]);
      }
    }

    const handleValueChange = (event) => {
      setValue(event.target.value);
      setDropdownData(event.target.value);
    };

    function MyRealizedCard(stock) {
      function profitCheck() {
        if (stock.differ === 2) {
          return "- ";
        } else {
          return "+ ";
        }
      }
      const profitLabel = profitCheck();
      var differText = "";
      function differCheck() {
        if (stock.differ === 1) {
          differText = "판매";
          return "#4D97ED";
        } else if (stock.differ === 2) {
          differText = "구매";
          return "#DD4956";
        } else {
          differText = "입금";
          return "#FEBF45";
        }
      }
      const differLabel = differCheck();
      return (
        <div className={classes.myHistoryCard}>
          <div className={classes.namebox}>
            <div
              className={classes.section}
              style={{
                backgroundColor: differLabel,
              }}
            >
              {differText}
            </div>
            <div className={classes.stname}>{stock.name}</div>
          </div>
          <div className={classes.pricebox}>
            {" "}
            <img
              src={`${process.env.PUBLIC_URL}/wallet/coin.svg`}
              style={{ width: 12, height: 12, marginRight: "8px" }}
              alt=""
            />
            {profitLabel}
            {stock?.profit ? stock.profit.toLocaleString() : 0}
          </div>
        </div>
      );
    }

    return (
      <>
        <FormControl
          sx={{ m: 1, minWidth: 120, marginTop: "30px", margin: "0px" }}
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
                전체
              </Typography>
            </MenuItem>
            <MenuItem value={"2"}>
              <Typography
                fontSize={"14px"}
                fontWeight={"500"}
                color={"#474747"}
                fontFamily="Pretendard"
              >
                구매만
              </Typography>
            </MenuItem>
            <MenuItem value={"3"}>
              <Typography
                fontSize={"14px"}
                fontWeight={"500"}
                color={"#474747"}
                fontFamily="Pretendard"
              >
                입금만
              </Typography>
            </MenuItem>
            <MenuItem value={"4"}>
              <Typography
                fontSize={"14px"}
                fontWeight={"500"}
                color={"#474747"}
                fontFamily="Pretendard"
              >
                판매만
              </Typography>
            </MenuItem>
            <MenuItem value={"5"}>
              <Typography
                fontSize={"14px"}
                fontWeight={"500"}
                color={"#474747"}
                fontFamily="Pretendard"
              >
                주식만
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>
        <div className={classes.listbox}>
          {example &&
            example.map((stock, index) => (
              <MyRealizedCard
                key={stock.index}
                name={stock.stockName}
                profit={stock.totalTradingPrice}
                differ={stock.tradingType}
              />
            ))}
        </div>
      </>
    );
  }
  return (
    <>
      <GetCalenderData />
      <RealizedList />
    </>
  );
}

export default AccountHistory;
