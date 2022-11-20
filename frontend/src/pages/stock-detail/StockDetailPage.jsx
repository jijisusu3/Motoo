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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 324,
  height: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const styleTwo = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 324,
  height: 225,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  border: "none",
};

function StockDetailPage() {
  const params = useParams();
  const id = params.id;
  const [showCandleGraph, setShowCandleGraph] = useState(false);
  const navigate = useNavigate();
  // useEffect로 데이터 받아오고 관심목록에 있으면 true, 없으면 false 그대로
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

  function changeToCandle() {
    setShowCandleGraph(true);
  }
  function changeToLine() {
    setShowCandleGraph(false);
  }
  function OpenQModal() {
    const [graphExplain, setGraphExplain] = useState(false);
    function handleQModalOpen() {
      setGraphExplain(true);
    }
    function handleQModalClose() {
      setGraphExplain(false);
    }
    const [showLineExplain, setShowLineExplain] = useState(false)
    function clickLineExplain(){
      setShowLineExplain(true)
    }
    function clickCandleExplain() {
      setShowLineExplain(false)
    }
    return (
      <div style={{ marginLeft: "3%" }}>
        <img
          src={`${process.env.PUBLIC_URL}/Q.svg`}
          alt=""
          onClick={handleQModalOpen}
        />
        <Modal open={graphExplain} onClose={handleQModalClose}>
          {showLineExplain ? (
            <Box className={classes.deletebox} sx={style}>
              <div className={classes.title}>라인그래프의 색은?</div>
              <div className={classes.yellowbox}>
                <div className={classes.flexrow}>
                  <div>현재가가 전일 종가보다 높을때</div>
                  <div className={classes.red} style={{ marginLeft: 8 }}>빨간색</div>
                </div>
                <div className={classes.flexrow}>
                  <div>현재가가 전일 종가보다 낮을때</div>
                  <div className={classes.blue} style={{ marginLeft: 8 }}>파란색</div>
                </div>
              </div>
              <div className={classes.title} style={{ marginTop: 16 }}>라인그래프의 구성</div>
              <div className={classes.graybox}>
                <div>
                  <div style={{ color: '#7BCDC8' }}>최고가</div>
                  <div>해당 기간중 가장 높은 가격으로 거래된 가격</div>
                </div>
                <div>
                  <div style={{ color: '#7BCDC8' }}>최저가</div>
                  <div>해당 기간중 가장 낮은 가격으로 거래된 가격</div>
                </div>
              </div>
              <div className={classes.changebtn} onClick={clickCandleExplain}>캔들그래프 알아보기</div>
            </Box>
          ):(
            <Box className={classes.deletebox} sx={style}>
            <div className={classes.title}>캔들그래프의 색은?</div>
            <div className={classes.yellowbox}>
              <div className={classes.flexrow}>
                <div>시가가 종가보다 낮을때</div>
                <div className={classes.red} style={{ marginLeft: 8 }}>빨간색</div>
              </div>
              <div className={classes.flexrow}>
                <div>시가가 종가보다 높을때</div>
                <div className={classes.blue} style={{ marginLeft: 8 }}>파란색</div>
              </div>
            </div>
            <div className={classes.title} style={{ marginTop: 16 }}>캔들그래프의 구성</div>
            <div className={classes.biggraybox}>
              <div>
                <img className={classes.candleimg} src={`${process.env.PUBLIC_URL}/stock-detail/red.png`} alt=""/>
                <img className={classes.candleimg} src={`${process.env.PUBLIC_URL}/stock-detail/blue.png`} alt=""/>
              </div>
              <div className={classes.txts}>
                <div style={{ color: '#7BCDC8' }}>시가</div>
                <div>주식시장이 시작하면서 당일<br />처음 거래된 개별종목의 가격</div>
                <div style={{ color: '#7BCDC8', marginTop: 8 }}>종가</div>
                <div>주식시장이 마감하면서 당일<br />마지막 거래된 개별종목의 가격</div>
              </div>
            </div>
            <div className={classes.changebtn} onClick={clickLineExplain}>라인그래프 알아보기</div>
          </Box>
          )}
        </Modal>
      </div>
    );
  }

  function OpenMaxMinModal() {
    const [mmExplain, setMmExplain] = useState(false);
    function handleMModalOpen() {
      setMmExplain(true);
    }
    function handleMModalClose() {
      setMmExplain(false);
    }
    return (
      <div style={{ marginLeft: "3%" }}>
        <img
          src={`${process.env.PUBLIC_URL}/Q.svg`}
          alt=""
          onClick={handleMModalOpen}
        />
        <Modal open={mmExplain} onClose={handleMModalClose}>
          <Box className={classes.deletebox} sx={styleTwo}>
            <div className={classes.title}>이 주식은 오늘?</div>
            <div className={classes.minmaxbox}>
              주식 시장에서 개별 종목이 상승할 수 있는 최대 가격을<br />상한가, 하락할 수 있는 최저가를 하한가로 정해 가격<br />변동 폭을 제한하고 있습니다.
            </div>
            <div className={classes.yellowbox}>
              <div className={classes.flexrow}>
                <div className={classes.red}>상한가</div>
                <div>는 어제 종가를 기준으로</div>
                <div className={classes.red} style={{ marginLeft: 8 }}>+30%</div>
              </div>
              <div className={classes.flexrow}>
                <div className={classes.blue}>하한가</div>
                <div>는 어제 종가를 기준으로</div>
                <div className={classes.blue} style={{ marginLeft: 8 }}>-30%</div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
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
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
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
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
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
          <OpenQModal />
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
    const [showSellButton, setShowSellButton] = useState(false);
    const haveList = useSelector((state) => {
      return state.persistedReducer.setUser.user.haveList;
    });
    useEffect(() => {
      haveList.forEach((element) => {
        if ((element.ticker === id) && (element.available > 0)) {
          setShowSellButton(true);
        } else {
        }
      });
    }, [haveList]);
    const date = new Date();
    const nowDay = `${date.getFullYear()}-${("00" + (date.getMonth() + 1))
      .toString()
      .slice(-2)}-${("00" + date.getDate()).toString().slice(-2)}`;
    const nowTime = date.getTime();
    const before = new Date(`${nowDay} 09:00:00`).getTime();
    const after = new Date(`${nowDay} 15:30:00`).getTime();
    const weekend = ["Sat", "Sun"];
    const week = date.toString().slice(0, 3);

    if (before <= nowTime && nowTime <= after && !weekend.includes(week)) {
      if (showSellButton) {
        return (
          <div className={classes.buttons}>
            <div className={classes.buysell}>
              <Link to={`/stock/sell/${id}`}>
                <button
                  style={{ backgroundColor: "#7BCDC8", marginRight: "8px" }}
                  className={classes.buysellbutton}
                >
                  팔래요
                </button>
              </Link>
              <Link to={`/stock/buy/${id}`}>
                <button
                  style={{ backgroundColor: "#FECE6D" }}
                  className={classes.buysellbutton}
                >
                  살래요
                </button>
              </Link>
            </div>
          </div>
        );
      } else {
        return (
          <div className={classes.buttons}>
            <div className={classes.buysell}>
              <Link to={`/stock/buy/${id}`} state={{ data: shortStockData }}>
                <button style={{ backgroundColor: "#FECE6D" }} className={classes.sellbutton}>살래요</button>
              </Link>
            </div>
          </div>
        );
      }
    } 
    else {
      return (
        <div className={classes.buttons}>
          <div className={classes.buysell}>
            <button className={classes.sellbutton}>
              주문가능한 시간이 아닙니다
            </button>
          </div>
        </div>
      );
    }
  }
  function WishListIcon() {
    const [isWatchlist, setisWatchlist] = useState(true);

    const data = { token: userToken, id: stockData.id };
    const likeList = useSelector((state) => {
      return state.persistedReducer.setUser.user.likeList;
    });
    useEffect(() => {
      try {
        if (!likeList.includes(id)) {
          setisWatchlist(false);
        } else {
          setisWatchlist(true);
        }
      } catch {
        return;
      }
    }, [likeList]);
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
          onClick={() => heartClick()}
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
        onClick={() => heartClick()}
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
        <div style={{ color: "#DD4956" }}>
          어제보다 {stockData?.fluctuation_price ? stockData.fluctuation_price.toLocaleString() : 0}원 올랐어요 (+
          {stockData.fluctuation_rate}%)
        </div>
      );
    } else {
      setMainColor("#4D97ED");
      return (
        <div style={{ color: "#4D97ED" }}>
          어제보다 {stockData?.fluctuation_price ? stockData.fluctuation_price.toLocaleString() : 0}원 떨어졌어요 (
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
            <div className={classes.big}>{shortStockData?.price ? shortStockData.price.toLocaleString(): 0}원</div>
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
          <OpenMaxMinModal />
        </div>
        <div>
          {stockData && (
            <div className={classes.repre}>
              <div className={classes.rowbox}>
                아무리 올라도{" "}
                <div className={classes.upcoltex}>{stockData?.maximum ? stockData.maximum.toLocaleString():0}원</div>
              </div>
              <div className={classes.rowbox}>
                아무리 떨어져도{" "}
                <div className={classes.downcoltex}>{stockData?.minimum ? stockData.minimum.toLocaleString():0}원</div>
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
                {stockData?.trading_value ? stockData.trading_value.toLocaleString(): 0}원
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
              <div className={classes.infotxt}>{stockData?.eps ? stockData.eps.toLocaleString():0}원</div>
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
          </div>
          <div className={classes.line}></div>
          {stockData.div_yield ? (
            <div className={classes.epsper}>
            <div className={classes.imgrowbox}>
              <div className={classes.rowbox}>
                <div className={classes.today}>{stockData.name}의 배당수익률</div>
                <img
                  src={`${process.env.PUBLIC_URL}/stock-detail/increase.svg`}
                  alt=""
                />
              </div>
              <div className={classes.infotxt}>{stockData.div_yield}%</div>
            </div>
            <div className={classes.explainbox}>
              <div className={classes.space}>
                <div className={classes.today}>배당수익률 이란?</div>
                <div className={classes.script}>
                1주당 배당금의 비율로, 해당 주식에 투자하면 얻을 수
                있는 수익을 나타내는 지표입니다.
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
                  주가가 오르지 않아도 배당수익률 만큼의 수익을 기대할 수 있어 실제 시장에서의 수익성을 판단할 수 있습니다.
                </div>
              </div>
            </div>
          </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <BuySellButton />
    </div>
  );
}

export default StockDetailPage;
