import React, { useState } from "react";
import "./RealizedPL.module.css";
// import RealizedList from "./RealizedList";
import classes from "./RealizedPL.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import datejs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
datejs.extend(isBetween);

function RealizedPL() {
  const [data, setData] = useState([
    {
      priceHigh: [
        {
          name: "삼성전자",
          dateTime: "2022-09-26",
          code: 300020,
          profit: 111600,
          percent: 29,
          mean: 63200,
          now: 88000,
          many: 45,
          all: 3960000,
        },
        {
          name: "SK하이닉스",
          dateTime: "2021-09-26",
          profit: -111600,
          code: 671021,
          percent: -29,
          mean: 63200,
          now: 88000,
          many: 45,
          all: 3960000,
        },
        {
          name: "LG디스플레이",
          dateTime: "2022-10-23",
          profit: 111600,
          code: 582901,
          percent: 29,
          mean: 63200,
          now: 88000,
          many: 45,
          all: 3960000,
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
          percent: 29,
          mean: 63200,
          now: 88000,
          many: 45,
          all: 3960000,
        },
        {
          name: "ggggg",
          dateTime: "2021-09-26",
          profit: -111600,
          code: 671021,
          percent: -29,
          mean: 63200,
          now: 88000,
          many: 45,
          all: 3960000,
        },
        {
          name: "LG디스플레이",
          dateTime: "2022-10-23",
          profit: 111600,
          code: 582901,
          percent: 29,
          mean: 63200,
          now: 88000,
          many: 45,
          all: 3960000,
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
          percent: 29,
          mean: 63200,
          now: 88000,
          many: 45,
          all: 3960000,
        },
        {
          name: "SK하이닉스",
          dateTime: "2021-09-26",
          profit: -111600,
          code: 671021,
          percent: -29,
          mean: 63200,
          now: 88000,
          many: 45,
          all: 3960000,
        },
        {
          name: "ggggg",
          dateTime: "2022-10-23",
          profit: 111600,
          code: 582901,
          percent: 29,
          mean: 63200,
          now: 88000,
          many: 45,
          all: 3960000,
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
            <div>
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
    const [value, setValue] = useState('1');
    const [ data, setData ] = useState(timeList)
    const [ example, setExample ] = useState(timeList[0]['priceHigh'])
  
    function setDropdownData(value) {
      if (value === '1') {
        setExample(data[0]['priceHigh']);
      } else if (value === '2') {
        setExample(data[1]['profitHigh']);
      } else {
        setExample(data[2]['profitLow'])
      }
    }
    const handleValueChange = (event) => {
      setValue(event.target.value);
      setDropdownData(event.target.value)
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
                  <img src={`${process.env.PUBLIC_URL}/wallet/coin.svg`} style={{ width: 12, height: 12 }} alt="" />
                  <div className={classes.result}>
                    평가손익
                  </div>
                </div>
                <div className={classes.section} style={{ color: profitColor }}>{stock.profit}</div>
              </div>
              <div className={classes.rowbox}>
                <div className={classes.rowbox}>
                  <img src={`${process.env.PUBLIC_URL}/wallet/chart.svg`} style={{ width: 12, height: 12 }} alt="" />
                  <div className={classes.result}>
                    수익률
                  </div>
                </div>
                <div className={classes.section} style={{ color: profitColor }}>{stock.percent}%</div>
              </div>
            </div>
          </div>
          <div className={classes.belowbox}>
            <div className={classes.infobox}>
              평균구매가
              <div className={classes.numbox}>
                <p className={classes.txts}>{stock.mean}</p>원
              </div>
            </div>
            <div className={classes.infobox}>
              판매가
              <div className={classes.numbox}>
                <p className={classes.txts}>{stock.now}</p>원
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
                <p className={classes.txts}>{stock.all}</p>원
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <>
      <FormControl sx={{ minWidth: 120 }} size="small">
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
          <MenuItem sx={{ background: "#fff" }} value={'1'}>보유가격순</MenuItem>
          <MenuItem value={'2'}>수익률높은순</MenuItem>
          <MenuItem value={'3'}>수익률낮은순</MenuItem>
        </Select>
      </FormControl>
      <div className={classes.listbox}>
        {example.map((stock) => (
          <MyRealizedCard
            key={stock.code}
            name={stock.name}
            profit={stock.profit}
            percent={stock.percent}
            mean={stock.mean}
            now={stock.now}
            many={stock.many}
            all={stock.all}
          />
        ))}
      </div>
    </>
    );
  }
  return (
    <>
      <GetCalenderData />
      <RealizedList/>
    </>
  );
}

export default RealizedPL;
