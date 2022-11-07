import React, { useState } from "react";
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
datejs.extend(isBetween);

function AccountHistory() {
  const [data, setData] = useState([
    {
      priceHigh: [
        {
          name: "삼성전자",
          dateTime: "2022-09-26",
          code: 300020,
          profit: 111600,
          differ: 1,
        },
        {
          name: "SK하이닉스",
          dateTime: "2021-09-26",
          profit: -111600,
          code: 671021,
          differ: 2,
        },
        {
          name: "LG디스플레이",
          dateTime: "2022-10-23",
          profit: 111600,
          code: 582901,
          differ: 3,
        },
      ],
    },
    {
      profitHigh: [
        {
          name: "삼성전자",
          dateTime: "2022-09-26",
          code: 300020,
          profit: 111600,
          differ: 1,
        },
        {
          name: "ggggg",
          dateTime: "2021-09-26",
          profit: -111600,
          code: 671021,
          differ: 2,
        },
        {
          name: "LG디스플레이",
          dateTime: "2022-10-23",
          profit: 111600,
          code: 582901,
          differ: 3,
        },
      ],
    },
    {
      profitLow: [
        {
          name: "삼성전자",
          dateTime: "2022-09-26",
          code: 300020,
          profit: 111600,
          differ: 1,
        },
        {
          name: "SK하이닉스",
          dateTime: "2021-09-26",
          profit: -111600,
          code: 671021,
          differ: 2,
        },
        {
          name: "ggggg",
          dateTime: "2022-10-23",
          profit: 111600,
          code: 582901,
          differ: 3,
        },
      ],
    },
  ]);
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
        {
          profitLow: [],
        },
      ];
      const categoryList = ["priceHigh", "profitHigh", "profitLow"];
      var count = 0;
      for (var i of categoryList) {
        for (var j of data[count][i]) {
          var stockDate = datejs(j["dateTime"], "YYYY-MM-DD");
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
        count += 1;
      }
      setTimeList(newList);
    };

    function dateRefresh() {
      setTimeList(data);
      setStartDate();
      setEndDate();
    }
    return (
      <div className={classes.calender}>
        <div>
          <img
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
            <div>-</div>
            <div className={classes.wrap}>
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
          </div>
        </form>
        <div>
          <img
            className={classes.imgs}
            onClick={dateRefresh}
            src={`${process.env.PUBLIC_URL}/wallet/dateRefresh.svg`}
            alt=""
          />
        </div>
      </div>
    );
  }
  // 드롭다운 value기준 정렬
  function RealizedList() {
    const [value, setValue] = useState("1");
    const [data, setData] = useState(timeList);
    const [example, setExample] = useState(timeList[0]["priceHigh"]);

    function setDropdownData(value) {
      if (value === "1") {
        setExample(data[0]["priceHigh"]);
      } else if (value === "2") {
        setExample(data[1]["profitHigh"]);
      } else {
        setExample(data[2]["profitLow"]);
      }
    }
    const handleValueChange = (event) => {
      setValue(event.target.value);
      setDropdownData(event.target.value);
    };

    function MyRealizedCard(stock) {
      function profitCheck() {
        if (stock.profit < 0) {
          return;
        } else {
          return "+";
        }
      }
      const profitLabel = profitCheck();
      var differText = ''
      function differCheck() {
        if (stock.differ === 1) {
          differText = '판매'
          return "#4D97ED";
        } else if (stock.differ === 2) {
          differText = '구매'
          return "#DD4956";
        } else {
          differText = '입금'
          return "#FEBF45";
        }
      }
      const differLabel = differCheck();
      return (
        <div className={classes.myHistoryCard}>
          <div className={classes.namebox}>
            <div className={classes.section}
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
            {profitLabel}
            {stock.profit}
          </div>
        </div>
      );
    }

    return (
      <>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
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
            <MenuItem value={"1"}>보유가격순</MenuItem>
            <MenuItem value={"2"}>수익률높은순</MenuItem>
            <MenuItem value={"3"}>수익률낮은순</MenuItem>
          </Select>
        </FormControl>
        <div className={classes.listbox}>
          {example.map((stock) => (
            <MyRealizedCard
              key={stock.code}
              name={stock.name}
              profit={stock.profit}
              differ={stock.differ}
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
