import React, { useState } from "react";
import "./RealizedPL.module.css";
// import classes from "./RealizedPL.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import datejs from "dayjs";

function RealizedPL() {
  const [data, setData] = useState([
    {
      priceHigh: [
        {
          name: "삼성전자",
          dateTime: "20220926",
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
          dateTime: "20210926",
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
          dateTime: "20221023",
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
          dateTime: "20220926",
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
          dateTime: "20210926",
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
          dateTime: "20221023",
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
          dateTime: "20220926",
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
          dateTime: "20210926",
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
          dateTime: "20221023",
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
        startChoice: `${startDate.getFullYear()}${(
          "00" +
          (startDate.getMonth() + 1)
        )
          .toString()
          .slice(-2)}${("00" + startDate.getDate()).toString().slice(-2)}`,
        endChoice: `${endDate.getFullYear()}${("00" + (endDate.getMonth() + 1))
          .toString()
          .slice(-2)}${("00" + endDate.getDate()).toString().slice(-2)}`,
      };
      const newList = [
        {
          priceHigh: []
        },
        {
          profitHigh: []
        },
        {
          profitLow: []
        },
      ]
      const categoryList = ["priceHigh", "profitHigh", "profitLow"];
      var count = 0
      for ( var i of categoryList ) {
        for( var j of data[count][i]){
          console.log(j['dateTime'])
        }
        count += 1
      }
    };

    function dateRefresh() {
      setTimeList(data);
      setStartDate();
      setEndDate();
    }
    return (
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <div className="section">
            <div className="section-content">
              <div>
                <DatePicker
                  required
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
              <div>
                <DatePicker
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
            </div>
          </div>
          <div className="section">
            <button>찾기</button>
          </div>
        </form>
        <img
          onClick={dateRefresh}
          src={`${process.env.PUBLIC_URL}/dateRefresh.svg`}
          alt=""
        />
      </div>
    );
  }
  return (
    <>
      <GetCalenderData />
    </>
  );
}

export default RealizedPL;
