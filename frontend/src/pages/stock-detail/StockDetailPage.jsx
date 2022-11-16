import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import ReactApexChart from "react-apexcharts";
import ko from "apexcharts/dist/locales/ko.json";
import classes from "./StockDetailPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav } from "../../stores/navSlice";
import { stockDetailGet } from "../../stores/stockSlice";
import { likeStockPost, realtimeAccountGet } from "../../stores/userSlice";
import { width } from "@mui/system";

function StockDetailPage() {
  const params = useParams();
  const id = params.id;
  const [showCandleGraph, setShowCandleGraph] = useState(false);
  const navigate = useNavigate();
  // useEffect로 데이터 받아오고 구매주식목록에 있으면 true, 없으면 false 그대로
  const [showSellButton, setShowSellButton] = useState(true);
  // useEffect로 데이터 받아오고 관심목록에 있으면 true, 없으면 false 그대로
  const [isWatchlist, setisWatchlist] = useState(true);
  const [mainColor, setMainColor] = useState("#DD4956");
  const stockData = useSelector((state) => {
    return state.setStock.detail;
  });
  const shortStockData = useSelector((state) => {
    return state.setStock.shortStockData;
  });
  const userToken = useSelector((state) => {
    return state.persistedReducer.setUser.user.token;
  });
  const userCurrent = useSelector((state) => {
    return state.persistedReducer.setUser.user.data.current;
  });
  const haveList = useSelector((state) => {
    return state.persistedReducer.setUser.user.haveList;
  });
  const likeList = useSelector((state) => {
    return state.persistedReducer.setUser.user.likeList;
  });
  const data = {
    config: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
    id: userCurrent,
  };
  function backTo() {
    navigate(-1);
  }
  const dispatch = useDispatch();

  function goToIndustry() {
    navigate(`/stock/industry/${stockData.category_id}`);
  }

  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
    dispatch(stockDetailGet(id));
    dispatch(realtimeAccountGet(data));
  }, []);

  useEffect(() => {
    haveList.forEach((element) => {
      if (element.ticker === id) {
        setShowSellButton(true);
      } else {
        setShowSellButton(false);
      }
    });
    try {
      if (!likeList.includes(id)) {
        setisWatchlist(false);
      } else {
        setisWatchlist(true);
      }
    } catch {
      console.log("???????");
      return;
    }
  }, [haveList, likeList]);

  useEffect(() => {
    const wss = new WebSocket("wss://k7b204.p.ssafy.io:443/api1/socket/ws");
    wss.onopen = () => {
      wss.send("전지수 보이삼보이삼?");
    };
    wss.onmessage = (event) => {
      console.log(`받았다 니 데이터 : ${event.data}`);
    };
  });

  function changeToCandle() {
    setShowCandleGraph(true);
  }
  function changeToLine() {
    setShowCandleGraph(false);
  }

  function StockDetailGraph() {
    const [candleGraphData, setCandleGraphData] = useState({
      series: [
        {
          data: [],
        },
      ],
      options: {
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#DD4956",
              downward: "#4D97ED",
            },
          },
        },
        chart: {
          animations: {
            enabled: false,
          },
          type: "candlestick",
          height: 350,
          locales: [ko],
          defaultLocale: "ko",
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: false,
            },
          },
          selection: {
            enabled: false,
          },
        },
        grid: {
          show: false,
        },
        xaxis: {
          tickPlacement: "between",
          show: false,
          type: "category",
          labels: {
            show: false,
            datetimeFormatter: {
              year: "yy년",
              month: "yy년 MM월",
              day: "MM월 dd일",
              hour: "HH:mm",
            },
          },
        },
        yaxis: {
          show: false,
        },
        tooltip: {
          custom: function ({ seriesIndex, dataPointIndex, w }) {
            const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
            const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
            const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
            const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
            return (
              '<div class="apexcharts-tooltip-candlestick">' +
              '<div>&nbsp시작가: <span class="value">' +
              o +
              "&nbsp</span></div>" +
              '<div>&nbsp최고가: <span class="value">' +
              h +
              "&nbsp</span></div>" +
              '<div>&nbsp최저가: <span class="value">' +
              l +
              "&nbsp</span></div>" +
              '<div>&nbsp마감가: <span class="value">' +
              c +
              "&nbsp</span></div>" +
              "</div>"
            );
          },
          // 일인지 월인지 등등에 따라 format 바꿔주기
          // 일 일때는: 'HH:mm' 주일 때는: 'dddd' 월일때에는: 'MMM dd', 년일때에는: 'MMM dd'
          x: {
            enabled: true,
            formatter: function (value, timeStamp) {
              const date = new Date(value);
              return date.toLocaleString();
            },
          },
        },
      },
    });
    const extremeValues = [
      { x: new Date(), y: 0, z: "최저가" },
      { x: new Date(), y: 0, z: "최고가" },
    ];
    const [lineGraphData, setLineGraphData] = useState({
      series: [
        {
          name: "ExtremeValue",
          type: "scatter",
          data: [
            // {
            //   x: extremeValues[0].x,
            //   y: extremeValues[0].y,
            //   z: extremeValues[0].z,
            // },
            // {
            //   x: extremeValues[1].x,
            //   y: extremeValues[0].y,
            //   z: extremeValues[1].z,
            // },
          ],
        },
        {
          name: "Line",
          data: [],
        },
      ],
      options: {
        colors: [mainColor, mainColor],
        chart: {
          animations: {
            enabled: false,
          },
          height: 350,
          width: "100%",
          type: "line",
          locales: [ko, ko],
          defaultLocale: "ko",
          toolbar: {
            show: false,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: false,
            },
          },
          selection: {
            enabled: false,
          },
        },
        grid: {
          show: false,
        },
        markers: {
          size: [1, 0],
          hover: {
            size: 0,
          },
        },

        stroke: {
          width: 3,
          curve: "smooth",
          colors: mainColor,
          lineCap: "butt",
        },
        legend: {
          show: false,
        },
        xaxis: {
          show: false,
          seriesName: "Line",
          type: "datetime",
          labels: {
            show: true,
            datetimeFormatter: {
              year: "yy년",
              month: "yy년 MM월",
              day: "MM월 dd일",
              hour: "HH:mm",
            },
          },
        },
        yaxis: [
          {
            show: false,
            seriesName: "ExtremeValue",
            labels: {
              style: {
                colors: mainColor,
              },
            },
          },
          {
            show: false,
            seriesName: "Line",
            labels: {
              style: {
                colors: mainColor,
              },
            },
          },
        ],
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            if (seriesIndex === 1) {
              return (
                series[seriesIndex][dataPointIndex].toLocaleString() + "원"
              );
            }
            return extremeValues[dataPointIndex].y.toLocaleString() + "원";
          },
          x: {
            enabled: true,
            formatter: function (value, timeStamp) {
              const date = new Date(value);
              return date.toLocaleString();
            },
          },
        },
      },
    });
    useEffect(() => {
      if (stockData.daily) {
        let tmpDaily = [];
        let tmpDailyCandle = [];
        stockData.daily.forEach((element) => {
          const tmpLine = {
            x:
              element.date +
              " " +
              element.time.slice(0, 2) +
              ":" +
              element.time.slice(2, 4),
            y: element.price,
          };
          const tmpCandle = {
            x:
              element.date +
              " " +
              element.time.slice(0, 2) +
              ":" +
              element.time.slice(2, 4),
            y: [
              element.open_price,
              element.max_price,
              element.min_price,
              element.price,
            ],
          };
          tmpDaily.push(tmpLine);
          tmpDailyCandle.push(tmpCandle);
        });

        setCandleGraphData((pre) => ({
          ...pre,
          series: [
            {
              data: tmpDailyCandle,
            },
          ],
          options: {
            yaxis: {
              show: false,
              min: parseInt(
                (8 * stockData.daily_min.min_price + stockData.minimum - 900) /
                  9
              ),
              max: parseInt(
                (8 * stockData.daily_max.max_price + stockData.maximum + 900) /
                  9
              ),
            },
          },
        }));

        extremeValues[0].x =
          stockData.daily_min.date +
          " " +
          stockData.daily_min.time.slice(0, 2) +
          ":" +
          stockData.daily_min.time.slice(2, 4);
        extremeValues[1].x =
          stockData.daily_max.date +
          " " +
          stockData.daily_max.time.slice(0, 2) +
          ":" +
          stockData.daily_max.time.slice(2, 4);
        extremeValues[0].y = stockData.daily_min.min_price;
        extremeValues[1].y = stockData.daily_max.max_price;
        setLineGraphData((pre) => ({
          ...pre,
          series: [
            {
              name: "ExtremeValue",
              type: "scatter",
              data: [
                {
                  x: extremeValues[0].x,
                  y: extremeValues[0].y,
                  z: extremeValues[0].z,
                },
                {
                  x: extremeValues[1].x,
                  y: extremeValues[1].y,
                  z: extremeValues[1].z,
                },
              ],
            },
            {
              name: "Line",
              data: tmpDaily,
            },
          ],
          options: {
            xaxis: {
              show: false,
              seriesName: "Line",
              type: "datetime",
              labels: {
                show: false,
                datetimeFormatter: {
                  year: "yy년",
                  month: "yy년 MM월",
                  day: "MM월 dd일",
                  hour: "HH:mm",
                },
              },
            },
            markers: {
              size: [5, 0],
              strokeWidth: 5,
              strokeOpacity: 0.5,
              shape: "circle",
              radius: 2,
              fillOpacity: 1,
              showNullDataPoints: true,
              hover: {
                size: undefined,
                sizeOffset: 3,
              },
            },
            yaxis: [
              {
                show: false,
                min: parseInt(
                  (8 * stockData.daily_min.min_price +
                    stockData.minimum -
                    1350) /
                    9
                ),
                max: parseInt(
                  (8 * stockData.daily_max.max_price +
                    stockData.maximum +
                    1350) /
                    9
                ),
                labels: {
                  style: {
                    colors: mainColor,
                  },
                },
              },
              {
                show: false,
                min: parseInt(
                  (8 * stockData.daily_min.min_price +
                    stockData.minimum -
                    1350) /
                    9
                ),
                max: parseInt(
                  (8 * stockData.daily_max.max_price +
                    stockData.maximum +
                    1350) /
                    9
                ),
                labels: {
                  style: {
                    colors: mainColor,
                  },
                },
              },
            ],
          },
        }));
      }
    }, []);
    let clickedOptions = candleGraphData.options;
    let clickedSeries = candleGraphData.series;
    let clickedType = "candlestick";
    const handleOptionChange = (event) => {
      if (event.target.id === "daily") {
        const tmpDaily = [];
        const tmpDailyCandle = [];
        stockData.daily.forEach((element) => {
          const tmpLine = {
            x:
              element.date +
              " " +
              element.time.slice(0, 2) +
              ":" +
              element.time.slice(2, 4),
            y: element.price,
          };
          const tmpCandle = {
            x:
              element.date +
              " " +
              element.time.slice(0, 2) +
              ":" +
              element.time.slice(2, 4),
            y: [
              element.open_price,
              element.max_price,
              element.min_price,
              element.price,
            ],
          };
          tmpDaily.push(tmpLine);
          tmpDailyCandle.push(tmpCandle);
        });
        extremeValues[0].x =
          stockData.daily_min.date +
          " " +
          stockData.daily_min.time.slice(0, 2) +
          ":" +
          stockData.daily_min.time.slice(2, 4);
        extremeValues[1].x =
          stockData.daily_max.date +
          " " +
          stockData.daily_max.time.slice(0, 2) +
          ":" +
          stockData.daily_max.time.slice(2, 4);
        extremeValues[0].y = stockData.daily_min.min_price;
        extremeValues[1].y = stockData.daily_max.max_price;
        setCandleGraphData((pre) => ({
          ...pre,
          series: [
            {
              data: tmpDailyCandle,
            },
          ],
          options: {
            yaxis: {
              show: false,
              min: parseInt(
                (8 * stockData.daily_min.min_price + stockData.minimum - 1350) /
                  9
              ),
              max: parseInt(
                (8 * stockData.daily_max.max_price + stockData.maximum + 1350) /
                  9
              ),
            },
          },
        }));
        setLineGraphData((pre) => ({
          ...pre,
          series: [
            {
              name: "ExtremeValue",
              type: "scatter",
              data: [
                {
                  x: extremeValues[0].x,
                  y: extremeValues[0].y,
                  z: extremeValues[0].z,
                },
                {
                  x: extremeValues[1].x,
                  y: extremeValues[1].y,
                  z: extremeValues[1].z,
                },
              ],
            },
            {
              name: "Line",
              data: tmpDaily,
            },
          ],
          options: {
            markers: {
              size: [5, 0],
              strokeWidth: 5,
              strokeOpacity: 0.5,
              shape: "circle",
              radius: 2,
              fillOpacity: 1,
              showNullDataPoints: true,
              hover: {
                size: undefined,
                sizeOffset: 3,
              },
            },
            yaxis: [
              {
                show: false,
                min: parseInt(
                  (8 * stockData.daily_min.min_price +
                    stockData.minimum -
                    1350) /
                    9
                ),
                max: parseInt(
                  (8 * stockData.daily_max.max_price +
                    stockData.maximum +
                    1350) /
                    9
                ),
                labels: {
                  style: {
                    colors: mainColor,
                  },
                },
              },
              {
                show: false,
                min: parseInt(
                  (8 * stockData.daily_min.min_price +
                    stockData.minimum -
                    1350) /
                    9
                ),
                max: parseInt(
                  (8 * stockData.daily_max.max_price +
                    stockData.maximum +
                    1350) /
                    9
                ),
                labels: {
                  style: {
                    colors: mainColor,
                  },
                },
              },
            ],
          },
        }));
      } else if (event.target.id === "weekly") {
        const tmpWeeky = [];
        const tmpWeeklyCandle = [];
        stockData.weekly.forEach((element) => {
          const tmpLine = {
            x:
              element.date +
              " " +
              element.time.slice(0, 2) +
              ":" +
              element.time.slice(2, 4),
            y: element.price,
          };
          const tmpCandle = {
            x:
              element.date +
              " " +
              element.time.slice(0, 2) +
              ":" +
              element.time.slice(2, 4),
            y: [
              element.open_price,
              element.max_price,
              element.min_price,
              element.price,
            ],
          };
          tmpWeeky.push(tmpLine);
          tmpWeeklyCandle.push(tmpCandle);
        });
        extremeValues[0].x =
          stockData.weekly_min.date +
          " " +
          stockData.weekly_min.time.slice(0, 2) +
          ":" +
          stockData.weekly_min.time.slice(2, 4);
        extremeValues[1].x =
          stockData.weekly_max.date +
          " " +
          stockData.weekly_max.time.slice(0, 2) +
          ":" +
          stockData.weekly_max.time.slice(2, 4);
        extremeValues[0].y = stockData.weekly_min.min_price;
        extremeValues[1].y = stockData.weekly_max.max_price;
        console.log("weekly", extremeValues);
        setCandleGraphData((pre) => ({
          ...pre,
          series: [
            {
              data: tmpWeeklyCandle,
            },
          ],
          options: {
            yaxis: {
              show: false,
              min: parseInt(stockData.weekly_min.min_price * 0.9),
              max: parseInt(stockData.weekly_max.max_price * 1.1),
            },
          },
        }));
        setLineGraphData((pre) => ({
          ...pre,
          series: [
            {
              name: "ExtremeValue",
              type: "scatter",
              data: [
                {
                  x: extremeValues[0].x,
                  y: extremeValues[0].y,
                  z: extremeValues[0].z,
                },
                {
                  x: extremeValues[1].x,
                  y: extremeValues[1].y,
                  z: extremeValues[1].z,
                },
              ],
            },
            {
              name: "Line",
              data: tmpWeeky,
            },
          ],
          options: {
            markers: {
              size: [5, 0],
              strokeWidth: 5,
              strokeOpacity: 0.5,
              shape: "circle",
              radius: 2,
              fillOpacity: 1,
              showNullDataPoints: true,
              hover: {
                size: undefined,
                sizeOffset: 3,
              },
            },
            yaxis: [
              {
                show: false,
                min: parseInt(stockData.weekly_min.min_price * 0.9),
                max: parseInt(stockData.weekly_max.max_price * 1.1),
              },
              {
                show: false,
                min: parseInt(stockData.weekly_min.min_price * 0.9),
                max: parseInt(stockData.weekly_max.max_price * 1.1),
              },
            ],
          },
        }));
      } else if (event.target.id === "monthly") {
        const tmpMonthly = [];
        const tmpMonthlyCandle = [];
        stockData.monthly.forEach((element) => {
          const tmpLine = {
            x: element.date,
            y: element.open_price,
          };
          const tmpCandle = {
            x: element.date,
            y: [
              element.open_price,
              element.max_price,
              element.min_price,
              element.close_price,
            ],
          };
          tmpMonthly.push(tmpLine);
          tmpMonthlyCandle.push(tmpCandle);
        });
        setCandleGraphData((pre) => ({
          ...pre,
          series: [
            {
              data: tmpMonthlyCandle,
            },
          ],
          options: {
            yaxis: {
              show: false,
              min: parseInt(stockData.monthly_min.min_price * 0.9),
              max: parseInt(stockData.monthly_max.max_price * 1.1),
            },
          },
        }));
        extremeValues[0].x = stockData.monthly_min.date;
        extremeValues[1].x = stockData.monthly_max.date;
        extremeValues[0].y = stockData.monthly_min.min_price;
        extremeValues[1].y = stockData.monthly_max.max_price;
        setLineGraphData((pre) => ({
          ...pre,
          series: [
            {
              name: "ExtremeValue",
              type: "scatter",
              data: [
                {
                  x: extremeValues[0].x,
                  y: extremeValues[0].y,
                  z: extremeValues[0].z,
                },
                {
                  x: extremeValues[1].x,
                  y: extremeValues[1].y,
                  z: extremeValues[1].z,
                },
              ],
            },
            {
              name: "Line",
              data: tmpMonthly,
            },
          ],
          options: {
            markers: {
              size: [5, 0],
              strokeWidth: 5,
              strokeOpacity: 0.5,
              shape: "circle",
              radius: 2,
              fillOpacity: 1,
              showNullDataPoints: true,
              hover: {
                size: undefined,
                sizeOffset: 3,
              },
            },
            yaxis: [
              {
                show: false,
                min: parseInt(stockData.monthly_min.min_price * 0.9),
                max: parseInt(stockData.monthly_max.max_price * 1.1),
              },
              {
                show: false,
                min: parseInt(stockData.monthly_min.min_price * 0.9),
                max: parseInt(stockData.monthly_max.max_price * 1.1),
              },
            ],
          },
        }));
      } else {
        const tmpYearly = [];
        const tmpYearlyCandle = [];
        stockData.yearly.forEach((element) => {
          const tmpLine = {
            x: element.date,
            y: element.open_price,
          };
          const tmpCandle = {
            x: element.date,
            y: [
              element.open_price,
              element.max_price,
              element.min_price,
              element.close_price,
            ],
          };
          tmpYearly.push(tmpLine);
          tmpYearlyCandle.push(tmpCandle);
        });
        setCandleGraphData((pre) => ({
          ...pre,
          series: [
            {
              data: tmpYearlyCandle,
            },
          ],
          options: {
            yaxis: {
              show: false,
              min: parseInt(stockData.yearly_min.min_price * 0.9),
              max: parseInt(stockData.yearly_max.max_price * 1.1),
            },
          },
        }));
        extremeValues[0].x = stockData.yearly_min.date;
        extremeValues[1].x = stockData.yearly_max.date;
        extremeValues[0].y = stockData.yearly_min.min_price;
        extremeValues[1].y = stockData.yearly_max.max_price;
        setLineGraphData((pre) => ({
          ...pre,
          series: [
            {
              name: "ExtremeValue",
              type: "scatter",
              data: [
                {
                  x: extremeValues[0].x,
                  y: extremeValues[0].y,
                  z: extremeValues[0].z,
                },
                {
                  x: extremeValues[1].x,
                  y: extremeValues[1].y,
                  z: extremeValues[1].z,
                },
              ],
            },
            {
              name: "Line",
              data: tmpYearly,
            },
          ],
          options: {
            markers: {
              size: [5, 0],
              strokeWidth: 5,
              strokeOpacity: 0.5,
              shape: "circle",
              radius: 2,
              fillOpacity: 1,
              showNullDataPoints: true,
              hover: {
                size: undefined,
                sizeOffset: 3,
              },
            },
            yaxis: [
              {
                show: false,
                min: parseInt(stockData.yearly_min.min_price * 0.9),
                max: parseInt(stockData.yearly_max.max_price * 1.1),
              },
              {
                show: false,
                min: parseInt(stockData.yearly_min.min_price * 0.9),
                max: parseInt(stockData.yearly_max.max_price * 1.1),
              },
            ],
          },
        }));
      }
      // data 변경해주기
    };
    if (!showCandleGraph) {
      clickedOptions = lineGraphData.options;
      clickedSeries = lineGraphData.series;
      clickedType = "line";
    } else {
      clickedOptions = candleGraphData.options;
      clickedSeries = candleGraphData.series;
      clickedType = "candlestick";
    }
    return (
      <>
        <div>
          <div className={classes.testtest}>
            <ReactApexChart
              options={clickedOptions}
              series={clickedSeries}
              type={clickedType}
              height={330}
              width={"90%"}
            />
          </div>
        </div>
        <div className={classes.radio}>
          <ul id="filter" className={classes.radioUlClass}>
            <div className={classes.radiobox}>
              <li className={classes.radioLiClass}>
                <input
                  type="radio"
                  name="filter"
                  id="daily"
                  className={classes.radioClass}
                  defaultChecked
                  onChange={handleOptionChange}
                />
                <label checked for="daily" className={classes.radioLabelClass}>
                  하루
                </label>
              </li>
              <li className={classes.radioLiClass}>
                <input
                  type="radio"
                  name="filter"
                  id="weekly"
                  className={classes.radioClass}
                  onChange={handleOptionChange}
                />
                <label for="weekly" className={classes.radioLabelClass}>
                  일주일
                </label>
              </li>
              <li className={classes.radioLiClass}>
                <input
                  type="radio"
                  name="filter"
                  id="monthly"
                  className={classes.radioClass}
                  onChange={handleOptionChange}
                />
                <label for="monthly" className={classes.radioLabelClass}>
                  한 달
                </label>
              </li>
              <li className={classes.radioLiClass}>
                <input
                  type="radio"
                  name="filter"
                  id="yearly"
                  className={classes.radioClass}
                  onChange={handleOptionChange}
                />
                <label for="yearly" className={classes.radioLabelClass}>
                  일 년
                </label>
              </li>
            </div>
          </ul>
          {showCandleGraph ? (
            <div className={classes.chartChangeBtn} onClick={changeToLine}>
              <img
                src={`${process.env.PUBLIC_URL}/stock-detail/line.svg`}
                alt=""
              />
            </div>
          ) : (
            <div className={classes.chartChangeBtn} onClick={changeToCandle}>
              <img
                src={`${process.env.PUBLIC_URL}/stock-detail/candle.svg`}
                alt=""
              />
            </div>
          )}
        </div>
      </>
    );
  }

  function WeatherCard(sen) {
    let border = "1px solid #C4CECE";
    // 나쁨일때
    if (sen.thisIndex === 0) {
      if (sen.thisIndex === sen.maxIndex) {
        border = "2px solid #DD4956";
      }
      return (
        <div className={classes.weatherbox} style={{ border: border }}>
          <img
            className={classes.wimg}
            src={`${process.env.PUBLIC_URL}/stock-detail/rain.svg`}
            alt=""
          />
          <div className={classes.perc}>{sen.sen.toFixed(2)}%</div>
        </div>
      );
    } else if (sen.thisIndex === 1) {
      // 보통일때
      if (sen.thisIndex === sen.maxIndex) {
        border = "2px solid #FEBF45";
      }
      return (
        <div className={classes.weatherbox} style={{ border: border }}>
          <img
            className={classes.wimg}
            src={`${process.env.PUBLIC_URL}/stock-detail/cloudy.svg`}
            alt=""
          />
          <div className={classes.perc}>{sen.sen.toFixed(2)}%</div>
        </div>
      );
    } else {
      if (sen.thisIndex === sen.maxIndex) {
        border = "2px solid #B1CC33";
      }
      return (
        <div className={classes.weatherbox} style={{ border: border }}>
          <img
            className={classes.wimg}
            src={`${process.env.PUBLIC_URL}/stock-detail/sun.svg`}
            alt=""
          />
          <div className={classes.perc}>{sen.sen.toFixed(2)}%</div>
        </div>
      );
    }
  }
  function WeatherCards() {
    const sentiments = stockData.sentiment;
    const max_num = Math.max(...sentiments);
    let max_index = 0;
    sentiments.forEach((element, index) => {
      if (element === max_num) {
        max_index = index;
      }
    });
    return (
      <div className={classes.edge}>
        {sentiments.map((sentiment, index) => (
          <WeatherCard
            key={index}
            sen={sentiment}
            maxIndex={max_index}
            thisIndex={index}
          />
        ))}
      </div>
    );
  }
  // 가격업데이트 될 때, 해당 데이터도 업데이트
  function BuySellButton() {
    if (showSellButton) {
      return (
        <div style={{ width: "100%" }}>
          <div className={classes.sellbuy}>
            <div className={classes.flx}>
              <Link to={`/stock/sell/${id}`}>
                <button style={{ marginRight: "5px" }} className={classes.sell}>
                  팔래요
                </button>
              </Link>
            </div>
            <div className={classes.flx}>
              <Link to={`/stock/buy/${id}`}>
                <button className={classes.buy}>살래요</button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.onlysellbuy}>
        <Link to={`/stock/buy/${id}`} state={{ data: shortStockData }}>
          <button className={classes.onlybuy}>살래요</button>
        </Link>
      </div>
    );
  }
  function WishListIcon() {
    let data = {};
    if (userToken) {
      data = { token: userToken, id: stockData.id };
    }
    const heartClick = () => {
      dispatch(likeStockPost(data));
    };
    if (isWatchlist) {
      return (
        <svg
          width="23"
          height="20"
          viewBox="0 0 23 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={heartClick}
        >
          <path
            d="M20.6386 1.36753C18.1922 -0.717255 14.5539 -0.342262 12.3084 1.97466L11.4289 2.88089L10.5495 1.97466C8.30843 -0.342262 4.66564 -0.717255 2.21926 1.36753C-0.584263 3.76034 -0.731582 8.05491 1.7773 10.6486L10.4155 19.5681C10.9736 20.144 11.8798 20.144 12.4378 19.5681L21.0761 10.6486C23.5894 8.05491 23.4421 3.76034 20.6386 1.36753Z"
            fill="#FE8289"
          />
        </svg>
      );
    }
    return (
      <svg
        width="23"
        height="20"
        viewBox="0 0 23 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={heartClick}
      >
        <path
          d="M20.6386 1.36753C18.1922 -0.717255 14.5539 -0.342262 12.3084 1.97466L11.4289 2.88089L10.5495 1.97466C8.30843 -0.342262 4.66564 -0.717255 2.21926 1.36753C-0.584263 3.76034 -0.731582 8.05491 1.7773 10.6486L10.4155 19.5681C10.9736 20.144 11.8798 20.144 12.4378 19.5681L21.0761 10.6486C23.5894 8.05491 23.4421 3.76034 20.6386 1.36753Z"
          fill="#929E9E"
        />
      </svg>
    );
  }
  function AnalyzedData() {
    if (stockData.keyword === null) {
      return;
    }
    return (
      <div>
        <div className={classes.rowbox}>
          <img
            src={`${process.env.PUBLIC_URL}/stock-detail/newspaper.svg`}
            alt=""
            style={{ marginRight: "16px" }}
          />
          <div className={classes.today}>
            오늘 {stockData.name} 날씨는?{" "}
            <span className={classes.news}>* 네이버 뉴스 기반</span>
          </div>
        </div>
        <div className={classes.weather}>
          {stockData.sentiment && <WeatherCards />}
        </div>

        <div className={classes.hrline2}></div>
        <div className={classes.rowbox}>
          <img
            src={`${process.env.PUBLIC_URL}/stock-detail/explain.svg`}
            alt=""
            style={{ marginRight: "16px", width: "20px" }}
          />
          <div style={{ marginTop: "8px" }} className={classes.today}>
            {stockData.name} 이렇게 표현되고 있어요
          </div>
        </div>
        <div className={classes.box}>
          <div className={classes.boxes}>
            {stockData.keyword &&
              stockData.keyword.map((word) => (
                <div className={classes.parent}>
                  <div className={classes.smbox}>{word}</div>
                </div>
              ))}
          </div>
        </div>
        <div className={classes.hrline2}></div>
      </div>
    );
  }
  function CompareText() {
    if (stockData.fluctuation_rate > 0) {
      setMainColor("#DD4956");
      return (
        <div>
          어제보다 {stockData.fluctuation_price}원 올랐어요 (+
          {stockData.fluctuation_rate}%)
        </div>
      );
    } else {
      setMainColor("#4D97ED");
      return (
        <div>
          어제보다 {stockData.fluctuation_price}원 떨어졌어요 (
          {stockData.fluctuation_rate}%)
        </div>
      );
    }
  }
  return (
    <div className={classes.stkdtbg}>
      <div className={classes.fix}>
        <div className={classes.fixbox}>
          <img
            onClick={backTo}
            src={`${process.env.PUBLIC_URL}/stock-detail/back.svg`}
            alt=""
          />
          <WishListIcon />
        </div>
        {/* <div className={classes.topline}></div> */}
      </div>
      <div className={classes.stkdtctn}>
        <div className={classes.dtsub1}>
          <div className={classes.dtctntitle}>
            <div className={classes.script}>{id} / KOSPI</div>
            <div className={classes.big}>{stockData.name}</div>
            <div className={classes.big}>{shortStockData.price}원</div>
            {stockData && <CompareText />}
          </div>
          <div className={classes.subctn1graph}>
            <StockDetailGraph />
          </div>
        </div>
        <div className={classes.roundline}></div>
        <div className={classes.hrline}></div>
        <div className={classes.imgrowbox}>
          <div className={classes.rowbox}>
            <img
              src={`${process.env.PUBLIC_URL}/stock-detail/cal.svg`}
              style={{ marginRight: "16px" }}
              alt=""
            />
            <div className={classes.today}>이 주식은 오늘 ?</div>
          </div>
          <img
            style={{ marginRight: "5px" }}
            src={`${process.env.PUBLIC_URL}/Q.svg`}
            alt=""
          />
        </div>
        <div>
          {stockData && (
            <div className={classes.repre}>
              <div className={classes.rowbox}>
                아무리 올라도{" "}
                <div className={classes.upcoltex}>{stockData.maximum}원</div>
              </div>
              <div className={classes.rowbox}>
                아무리 떨어져도{" "}
                <div className={classes.downcoltex}>{stockData.minimum}원</div>
              </div>
            </div>
          )}
        </div>
        <div className={classes.hrline3}></div>
        <AnalyzedData />
        <div className={classes.imgrowbox} onClick={goToIndustry}>
          <div className={classes.rowbox}>
            <img
              className={classes.ind}
              src={`${process.env.PUBLIC_URL}/stock-detail/industry.svg`}
              alt=""
              style={{ marginRight: "16px" }}
            />
            <div className={classes.today}>
              {stockData.category_name} 업종 키워드 보러가기
            </div>
          </div>
          <img src={`${process.env.PUBLIC_URL}/stock-list/goTo.svg`} alt="" />
        </div>
        <div className={classes.hrline2}></div>
        <div>
          <div className={classes.rowbox}>
            <img
              src={`${process.env.PUBLIC_URL}/stock-detail/checklist.svg`}
              alt=""
              style={{ marginRight: "16px" }}
            />
            <div className={classes.today}>기업정보</div>
          </div>
          <div className={classes.infobox}>
            <div>
              <div className={classes.info}>거래량</div>
              <div style={{ fontSize: "15px" }}>{stockData.volume}</div>
            </div>
            <div>
              <div className={classes.info}>거래대금</div>
              <div style={{ fontSize: "15px" }}>
                {stockData.trading_value}원
              </div>
            </div>
            <div>
              <div className={classes.info}>시가총액</div>
              <div style={{ fontSize: "15px" }}>{stockData.m_capital}억원</div>
            </div>
          </div>
          <div className={classes.line}></div>
          <div className={classes.epsper}>
            <div className={classes.imgrowbox}>
              <div className={classes.rowbox}>
                <div className={classes.today}>{stockData.name}의 EPS</div>
                <img
                  src={`${process.env.PUBLIC_URL}/stock-detail/increase.svg`}
                  alt=""
                />
              </div>
              <div className={classes.infotxt}>{stockData.eps}원</div>
            </div>
            <div className={classes.explainbox}>
              <div className={classes.space}>
                <div className={classes.today}>EPS 란?</div>
                <div className={classes.script}>
                  1년간의 순이익을 현재 발행된 총 주식수로 나누어 1주당 얼마나
                  많은 이익을 창출했는지 나타내는 지표입니다.
                </div>
              </div>
              <div className={classes.space}>
                <div className={classes.greenbox}>
                  <img
                    src={`${process.env.PUBLIC_URL}/stock-detail/check-circle.svg`}
                    alt=""
                  />
                  <div className={classes.green}>어떻게 판단하나요?</div>
                </div>
                <div
                  style={{ marginBottom: "18px", marginTop: "0px" }}
                  className={classes.script}
                >
                  EPS가 높다면 기업의 경영실적이 양호하고 배당여력이 많다는 것을
                  의미하므로 주가 상승의 요인이 됩니다.
                </div>
              </div>
            </div>
          </div>
          <div className={classes.line}></div>
          <div className={classes.epsper}>
            <div className={classes.imgrowbox}>
              <div className={classes.rowbox}>
                <div className={classes.today}>{stockData.name}의 PER</div>
                <img
                  src={`${process.env.PUBLIC_URL}/stock-detail/increase.svg`}
                  alt=""
                />
              </div>
              <div className={classes.infotxt}>{stockData.per}배</div>
            </div>
            <div className={classes.explainbox}>
              <div className={classes.space}>
                <div className={classes.today}>PER 란?</div>
                <div className={classes.script}>
                  현재 주가가 지난 1년간의 순이익의 몇배에 거래되고 있는지
                  보여주는 지표입니다.
                </div>
              </div>
              <div className={classes.space}>
                <div className={classes.greenbox}>
                  <img
                    src={`${process.env.PUBLIC_URL}/stock-detail/check-circle.svg`}
                    alt=""
                  />
                  <div className={classes.green}>어떻게 판단하나요?</div>
                </div>
                <div
                  style={{ marginBottom: "18px", marginTop: "0px" }}
                  className={classes.script}
                >
                  주가가 적당하게 평가되는지 판단하기 위해서는 같은 업종의
                  비슷한 규모의 회사와 비교해봐야 합니다.
                </div>
              </div>
            </div>
            <div style={{ height: "80px" }}></div>
          </div>
        </div>
      </div>
      <BuySellButton />
    </div>
  );
}

export default StockDetailPage;
