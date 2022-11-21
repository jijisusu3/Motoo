import { useEffect, useState } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import { schoolPageGet, schoolGet, schoolChangePut } from "../../stores/schoolSlice";
import { schoolBestGet } from "../../stores/stockSlice";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import classes from "./SchoolDetailPage.module.css";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  maxWidth: "400px",
  width: "85%",
  height: "460px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 5,
};


function SchoolDetailPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.persistedReducer.setUser.user;
  });
  const data = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
    dispatch(setActiveNav(3));
    dispatch(schoolPageGet(data));
    dispatch(schoolBestGet(data));
  }, []);
  const navigate = useNavigate();
  function goToHotStock(ticker) {
    navigate(`/stock/detail/${ticker}`);
  }
  
  const schoolData = useSelector((state) => {
    return state.setSchool.schoolBattleData;
  });
  const mySchoolAsset = useSelector((state) => {
    return state.setSchool.schoolBattleData.schoolSubResponse;
  });
  const myAsset = useSelector((state) => {
    return state.setSchool.schoolBattleData.schoolAccResponse;
  });
  const hotStock = useSelector((state) => {
    return state.setStock.schoolStock;
  });
  function goToSchoolWallet() {
    navigate(`/wallet/detail/${myAsset.schoolAccId}`);
  }

  function ChangeSchool() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [keyword, setKeyword] = useState();
    const [results, setResult] = useState([]);
    const [choicedId, setChoicedId] = useState();
    const [isGetId, setIsGetId] = useState(true);
    
    function onClickHandler() {
      const data = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      dispatch(schoolGet(data));
      handleOpen();
    }
    const schoolList = useSelector((state) => {
      return state.setSchool.schoolData;
    });
  
    const updateField = (field, value, update = true) => {
      setChoicedId(undefined);
      if (update) onSearch(value);
      if (field === "keyword") {
        setKeyword(value);
      }
    };
    const onSearch = (text) => {
      var results = schoolList.filter(
        (item) => true === matchName(item.schoolname, text)
      );
      setResult({ results });
    };
  
    const matchName = (name, keyword) => {
      var keyLen = keyword.length;
      name = name.toLowerCase().substring(0, keyLen);
      if (keyword === "") return false;
      return name === keyword.toString().toLowerCase();
    };
  
    function clickMySchool(id, name) {
      setChoicedId(id);
      setResult([]);
      setKeyword(name);
    }

    function SearchBar() {
      const updateText = (text) => {
        updateField("keyword", text, false);
        updateField("result", []);
      };
      var renderResults;
      const arr = results["results"];
      if (arr) {
        renderResults = arr.map((item) => {
          return (
            <div
              onClick={() => clickMySchool(item.schoolId, item.schoolname)}
            >
              <div className={classes.sidoList}>
                <div className={classes.sido}>
                  <p>{item.sigunguResponse.sido} {item.sigunguResponse.sigungu_name}</p>
                </div>
              </div>
              <div className={classes.schoolList}>{item.schoolname}</div>
  
              <div
                style={{ width: "100%", backgroundColor: "#EAF0EF", height: 1 }}
              ></div>
            </div>
          );
        });
      }
      return renderResults;
    }
    function startClick() {
      //학교 결과 클릭했을 때,
      if (choicedId) {
        const data = {
          config: {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
          result: {
            id: choicedId,
          },
        };
        dispatch(schoolChangePut(data));
        setTimeout(() => {
          window.location.reload()
        }, 50);
      } else {
        // 결과 하나만 남았을 때,
        if (results.results) {
          if (results.results.length === 1) {
            const data = {
              config: {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              },
              result: {
                id: results.results[0].schoolId,
              },
            };
            dispatch(schoolChangePut(data));
          } else {
            setIsGetId(false);
            setTimeout(() => {
              setIsGetId(true);
            }, 1000);
          }
        } else {
          setIsGetId(false);
          setTimeout(() => {
            setIsGetId(true);
          }, 1000);
        }
      }
    }
    return (
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/schoolstatic/schoolSetting.svg`}
          alt=""
          onClick={onClickHandler}
          />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <div style={{marginTop: "5px",marginBottom: "30px"}}className={classes.schoolText}>학교 수정하기</div>
              <div className={classes.schoolSearchBox}>
                <input
                  type="text"
                  autoFocus
                  value={keyword || ""}
                  onChange={(e) => updateField("keyword", e.target.value)}
                  placeholder="학교 이름을 입력해주세요."
                />
                <div className={classes.searchIcon}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5729 20.0938L18.0313 16.5625C19.1739 15.1067 19.794 13.309 19.7917 11.4583C19.7917 9.81016 19.3029 8.199 18.3873 6.82859C17.4716 5.45818 16.1701 4.39007 14.6474 3.75934C13.1246 3.12861 11.4491 2.96358 9.83259 3.28513C8.21608 3.60667 6.73122 4.40034 5.56578 5.56578C4.40034 6.73122 3.60667 8.21608 3.28513 9.83259C2.96358 11.4491 3.12861 13.1246 3.75934 14.6474C4.39007 16.1701 5.45818 17.4716 6.82859 18.3873C8.199 19.3029 9.81016 19.7917 11.4583 19.7917C13.309 19.794 15.1067 19.1739 16.5625 18.0313L20.0938 21.5729C20.1906 21.6706 20.3058 21.7481 20.4327 21.8009C20.5597 21.8538 20.6958 21.881 20.8333 21.881C20.9709 21.881 21.107 21.8538 21.2339 21.8009C21.3609 21.7481 21.4761 21.6706 21.5729 21.5729C21.6706 21.4761 21.7481 21.3609 21.8009 21.2339C21.8538 21.107 21.881 20.9709 21.881 20.8333C21.881 20.6958 21.8538 20.5597 21.8009 20.4327C21.7481 20.3058 21.6706 20.1906 21.5729 20.0938V20.0938ZM5.20834 11.4583C5.20834 10.2222 5.57489 9.01383 6.26165 7.98602C6.94841 6.95822 7.92453 6.15714 9.06657 5.68409C10.2086 5.21104 11.4653 5.08727 12.6777 5.32843C13.89 5.56959 15.0037 6.16484 15.8778 7.03892C16.7518 7.913 17.3471 9.02664 17.5882 10.239C17.8294 11.4514 17.7056 12.7081 17.2326 13.8501C16.7595 14.9921 15.9585 15.9683 14.9307 16.655C13.9028 17.3418 12.6945 17.7083 11.4583 17.7083C9.80073 17.7083 8.21102 17.0499 7.03892 15.8778C5.86682 14.7057 5.20834 13.1159 5.20834 11.4583Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  overflow: "auto",
                  width: "95%",
                  height: "50%",
                  // border: "1px solid red",
                  marginTop: "10px",
                }}
              >
                <SearchBar />
              </div>

              <button className={classes.schoolBtn} onClick={startClick}>
                변경하기
              </button>
              <div>
                {!isGetId && <div className={classes.schoolaler}>학교를 선택하세요!</div>}
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    )
  
  }


  function MyAssetCard() {
    return (
      <div className={classes.myrowbox}>
        <div className={classes.mycard}>
          <div className={classes.myrowbox}>
            <div>{user.data.nickname}</div>
            <div className={classes.rowbox}>
              <img
                src={`${process.env.PUBLIC_URL}/wallet/coin.svg`}
                style={{ width: 15, marginRight: 4 }}
                alt=""
              />
              {myAsset?.asset ? (
                <div>{myAsset.asset.toLocaleString()}원</div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={classes.mysmallbox}>
            <div className={classes.rowbox}>
              <img
                src={`${process.env.PUBLIC_URL}/schoolstatic/cake.svg`}
                alt=""
              />
              <div className={classes.graybox}>수익률</div>
            </div>
            {myAsset?.myAvg ? (
              <div>
                {myAsset.myAvg === "NaN" ? "0" : myAsset.myAvg.toFixed(2)}%
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={classes.mysmallbox}>
            <div className={classes.rowbox}>
              <img
                src={`${process.env.PUBLIC_URL}/schoolstatic/magic.svg`}
                alt=""
              />
              <div className={classes.graybox}>교내등수</div>
            </div>
            <div className={classes.rowbox}>
              {myAsset?.myRank ? (
                <div className={classes.rank}>{myAsset.myRank}등</div>
              ) : (
                <div>오전 7시 20분 공개</div>
              )}
            </div>
          </div>
        </div>
        <div className={classes.mybox} onClick={goToSchoolWallet}>
          나의
          <br />
          학교 대항전
          <br />
          보유주식
        </div>
      </div>
    );
  }

  function MySchoolCard(ranker) {
    const myInfo = ranker.info.split("#");
    if (ranker.ranking === 0) {
      return (
        <div className={classes.myschoolCardpodium}>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/first.svg`}
              alt=""
              style={{ width: 16, marginLeft: 10 }}
            />
            <div style={{ display: "inline", marginLeft: 12 }}>{myInfo[0]}</div>
          </div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[1]).toFixed(2)}%
          </div>
        </div>
      );
    } else if (ranker.ranking === 1) {
      return (
        <div className={classes.myschoolCardpodium}>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/second.svg`}
              alt=""
              style={{ width: 16, marginLeft: 10 }}
            />
            <div style={{ display: "inline", marginLeft: 12 }}>{myInfo[0]}</div>
          </div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[1]).toFixed(2)}%
          </div>
        </div>
      );
    } else if (ranker.ranking === 2) {
      return (
        <div className={classes.myschoolCardpodium}>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/third.svg`}
              alt=""
              style={{ width: 16, marginLeft: 10 }}
            />
            <div style={{ display: "inline", marginLeft: 12 }}>{myInfo[0]}</div>
          </div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[1]).toFixed(2)}%
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.myschoolCardNomal}>
          <div>
            <div
              style={{
                display: "inline",
                color: "#FEBF45",
                width: 16,
                marginLeft: 15,
              }}
            >
              {ranker.ranking + 1}
            </div>
            <div style={{ display: "inline", marginLeft: 15 }}>{myInfo[0]}</div>
          </div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[1]).toFixed(2)}%
          </div>
        </div>
      );
    }
  }
  function MySchoolCards() {
    let firstSlice = mySchoolAsset?.studRanks?.split(":");
    return (
      <div style={{ marginBottom: "2rem" }}>
        {firstSlice &&
          firstSlice
            .slice(0, -1)
            .map((ranker, index) => (
              <MySchoolCard key={ranker} info={ranker} ranking={index} />
            ))}
      </div>
    );
  }
  function SigunguPersonalCard(ranker) {
    const myInfo = ranker.info.split("#");
    if (ranker.ranking === 0) {
      return (
        <div className={classes.myschoolCardpodium}>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/first.svg`}
              alt=""
              style={{ width: 16, marginLeft: 10 }}
            />
            <div style={{ display: "inline", marginLeft: 12 }}>{myInfo[0]}</div>
          </div>
          <div>{myInfo[1]}</div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[2]).toFixed(2)}%
          </div>
        </div>
      );
    } else if (ranker.ranking === 1) {
      return (
        <div className={classes.myschoolCardpodium}>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/second.svg`}
              alt=""
              style={{ width: 16, marginLeft: 10 }}
            />
            <div style={{ display: "inline", marginLeft: 12 }}>{myInfo[0]}</div>
          </div>
          <div>{myInfo[1]}</div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[2]).toFixed(2)}%
          </div>
        </div>
      );
    } else if (ranker.ranking === 2) {
      return (
        <div className={classes.myschoolCardpodium}>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/third.svg`}
              alt=""
              style={{ width: 16, marginLeft: 10 }}
            />
            <div style={{ display: "inline", marginLeft: 12 }}>{myInfo[0]}</div>
          </div>
          <div>{myInfo[1]}</div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[2]).toFixed(2)}%
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.myschoolCardNomal}>
          <div>
            <div
              style={{
                display: "inline",
                color: "#FEBF45",
                width: 16,
                marginLeft: 15,
              }}
            >
              {ranker.ranking + 1}
            </div>
            <div style={{ display: "inline", marginLeft: 15 }}>{myInfo[0]}</div>
          </div>
          <div>{myInfo[1]}</div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[2]).toFixed(2)}%
          </div>
        </div>
      );
    }
  }
  function SigunguPersonalCards() {
    let firstSlice = mySchoolAsset?.sigunguSubResponse?.personal.split(":");
    return (
      <div style={{ marginBottom: "2rem" }}>
        {firstSlice &&
          firstSlice
            .slice(0, -1)
            .map((ranker, index) => (
              <SigunguPersonalCard key={ranker} info={ranker} ranking={index} />
            ))}
      </div>
    );
  }
  function SigunguSchoolCard(ranker) {
    const myInfo = ranker.info.split("#");
    if (ranker.ranking === 0) {
      return (
        <div className={classes.myschoolCardpodium}>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/first.svg`}
              alt=""
              style={{ width: 16, marginLeft: 10 }}
            />
            <div style={{ display: "inline", marginLeft: 12 }}>{myInfo[0]}</div>
          </div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[1]).toFixed(2)}%
          </div>
        </div>
      );
    } else if (ranker.ranking === 1) {
      return (
        <div className={classes.myschoolCardpodium}>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/second.svg`}
              alt=""
              style={{ width: 16, marginLeft: 10 }}
            />
            <div style={{ display: "inline", marginLeft: 12 }}>{myInfo[0]}</div>
          </div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[1]).toFixed(2)}%
          </div>
        </div>
      );
    } else if (ranker.ranking === 2) {
      return (
        <div className={classes.myschoolCardpodium}>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/third.svg`}
              alt=""
              style={{ width: 16, marginLeft: 10 }}
            />
            <div style={{ display: "inline", marginLeft: 12 }}>{myInfo[0]}</div>
          </div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[1]).toFixed(2)}%
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.myschoolCardNomal}>
          <div>
            <div
              style={{
                display: "inline",
                color: "#FEBF45",
                width: 16,
                marginLeft: 15,
              }}
            >
              {ranker.ranking + 1}
            </div>
            <div style={{ display: "inline", marginLeft: 15 }}>{myInfo[0]}</div>
          </div>
          <div style={{ marginRight: 15, color: "#DD4956" }}>
            {Number(myInfo[1]).toFixed(2)}%
          </div>
        </div>
      );
    }
  }
  function SigunguSchoolCards() {
    let firstSlice = mySchoolAsset?.sigunguSubResponse?.school_ranks.split(":");
    return (
      <div>
        {firstSlice &&
          firstSlice
            .slice(0, -1)
            .map((ranker, index) => (
              <SigunguSchoolCard key={ranker} info={ranker} ranking={index} />
            ))}
      </div>
    );
  }
  return (
    <>
      <div className={classes.outdiv}>
        <div className={classes.innerdiv}>
          <div className={classes.titlebox}>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/medal.svg`}
              alt=""
            />
            <div className={classes.title}>
              {schoolData?.eventsResponse?.eventsId ? (
                <div className={classes.maintitle}>
                  제 {schoolData.eventsResponse.eventsId}회 학교대항전
                </div>
              ) : (
                <></>
              )}
              {schoolData?.eventsResponse?.start_date ? (
                <div className={classes.date}>
                  {schoolData.eventsResponse.start_date.slice(0, 10)}
                  &nbsp;~&nbsp;
                  {schoolData.eventsResponse.close_date.slice(0, 10)}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={classes.myschool}>
            <div className={classes.rowbox}>
              <img
                style={{ marginRight: 8 }}
                src={`${process.env.PUBLIC_URL}/schoolstatic/school.svg`}
                alt=""
              />
              {schoolData?.schoolSubResponse?.schoolname ? (
                <div>{schoolData.schoolSubResponse.schoolname}</div>
              ) : (
                <></>
              )}
              <div style={{marginLeft:10}}><ChangeSchool /></div>
            </div>
            {schoolData?.schoolSubResponse?.currentRank ? (
              <div className={classes.rowbox}>
                <div style={{ fontWeight: "400", fontSize: "13px" }}>지역</div>
                <div className={classes.rank}>
                  {schoolData.schoolSubResponse.currentRank}
                </div>
                <div style={{ fontWeight: "400", fontSize: "13px" }}>등</div>
              </div>
            ) : (
              <div className={classes.rowbox}>
                <div style={{ fontWeight: "400", fontSize: "13px" }}>지역</div>
                <div className={classes.rank}>???&nbsp;</div>
                <div style={{ fontWeight: "400", fontSize: "13px" }}>등</div>
              </div>
            )}
          </div>
          <MyAssetCard />
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/schoolstatic/schoolbus.svg`}
              alt=""
            />
            <div
              className={classes.halfLineText}
              style={{ marginTop: "1.5rem" }}
            >
              지금 우리 학교는
            </div>
          </div>
          <div className={classes.hotStockRankingBox}>
            {hotStock?.stock_name ? (
              <div
                className={classes.hotStockBox}
                onClick={() => goToHotStock(hotStock.stock_ticker)}
              >
                <div>
                  <div>우리 학교</div>
                  <div style={{ display: "inline", color: "#FF2D2D" }}>HOT</div>
                  <div style={{ display: "inline" }}> 주식 🔥</div>
                </div>
                <div style={{ color: "#36938E", fontSize: 12 }}>
                  {hotStock.stock_name}
                </div>
              </div>
            ) : (
              <div className={classes.hotStockBox}>
                <div>
                  <div>우리 학교</div>
                  <div style={{ display: "inline", color: "#FF2D2D" }}>HOT</div>
                  <div style={{ display: "inline" }}> 주식 🔥</div>
                </div>
                <div style={{ color: "#36938E", fontSize: 12 }}>
                  HOT 주식없음
                </div>
              </div>
            )}
            <div className={classes.rankingBox}>
              <div className={classes.rankingRatioBox}>
                {(schoolData?.schoolSubResponse?.average && schoolData?.schoolSubResponse?.average) ? (
                  <div>
                    <div style={{ marginLeft: "12px" }}>
                      <div style={{ display: "inline", fontSize: 28 }}>
                        {schoolData.schoolSubResponse.average === "NaN"
                          ? "0"
                          : schoolData.schoolSubResponse.average.toFixed(2)}
                      </div>
                      <div style={{ display: "inline", fontSize: 18 }}>%</div>
                    </div>
                    <div
                      style={{ marginTop: 6, fontSize: 10, color: "#FED782" }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/schoolstatic/macaron.svg`}
                        alt=""
                        style={{ marginRight: 2 }}
                      />
                      평균 수익률
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ marginLeft: "12px" }}>
                      <div style={{ display: "inline", fontSize: 28 }}>
                        ?
                      </div>
                      <div style={{ display: "inline", fontSize: 18 }}>%</div>
                    </div>
                    <div
                      style={{ marginTop: 6, fontSize: 10, color: "#FED782" }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/schoolstatic/macaron.svg`}
                        alt=""
                        style={{ marginRight: 2 }}
                      />
                      평균 수익률
                    </div>
                  </div>
                )}
              </div>
              <div className={classes.rankingRankingBox}>
                {schoolData?.schoolSubResponse?.currentRank ? (
                  <div>
                    <div
                      style={{
                        display: "inline",
                        fontSize: 28,
                        marginLeft: "10px",
                      }}
                    >
                      {schoolData.schoolSubResponse.currentRank}
                    </div>
                    <div style={{ display: "inline", fontSize: 18 }}>등</div>
                    <div
                      style={{ marginTop: 6, fontSize: 10, color: "#FE8289" }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/schoolstatic/deco.svg`}
                        alt=""
                        style={{ marginRight: 2 }}
                      />
                      지역
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        display: "inline",
                        fontSize: 28,
                        marginLeft: "10px",
                      }}
                    >
                      ?
                    </div>
                    <div style={{ display: "inline", fontSize: 18 }}>등</div>
                    <div
                      style={{ marginTop: 6, fontSize: 10, color: "#FE8289" }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/schoolstatic/deco.svg`}
                        alt=""
                        style={{ marginRight: 2 }}
                      />
                      지역
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {schoolData?.schoolSubResponse?.schoolname ? (
              <div className={classes.rankingBanner}>
                {schoolData.schoolSubResponse.schoolname}
                <div style={{ display: "inline", color: "#FE8289" }}>
                  &nbsp;&nbsp;TOP
                </div>
              </div>
            ) : (
              <></>
            )}
            {(mySchoolAsset?.studRanks !== null) ? (
              <MySchoolCards />
            ) : (
              <div className={classes.whennull}>
                아직 순위가 없습니다. <br />
                <span>학교계좌로 주식을 사고 1등을 차지하세요!</span>
                <br />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#36938E",
                    fontWeight: 600,
                  }}
                >
                  매일 아침 7시 20분 업데이트
                </span>
              </div>
            )}
          </div>
          <div>
            {schoolData?.schoolSubResponse?.sigunguSubResponse?.sigungu_name ? (
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/schoolstatic/trophy.svg`}
                  alt=""
                />
                <div className={classes.halfLineText1}>
                  {schoolData.schoolSubResponse.sigunguSubResponse.sigungu_name}{" "}
                  개인 랭킹
                </div>
              </div>
            ) : (
              <></>
            )}
            {mySchoolAsset?.sigunguSubResponse?.personal !== null ? (
              <SigunguPersonalCards />
            ) : (
              <div className={classes.whennull}>
                아직 순위가 없습니다. <br />
                <span>학교계좌로 주식을 사고 1등을 차지하세요!</span>
                <br />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#36938E",
                    fontWeight: 600,
                  }}
                >
                  매일 아침 7시 20분 업데이트
                </span>
              </div>
            )}
          </div>
          <div style={{ height: 250 }}>
            {schoolData?.schoolSubResponse?.sigunguSubResponse?.sigungu_name ? (
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/schoolstatic/trophy.svg`}
                  alt=""
                />
                <div className={classes.halfLineText1}>
                  {schoolData.schoolSubResponse.sigunguSubResponse.sigungu_name}{" "}
                  학교 랭킹
                </div>
              </div>
            ) : (
              <></>
            )}
            {mySchoolAsset?.sigunguSubResponse?.school_ranks !== null ? (
              <SigunguSchoolCards />
            ) : (
              <div className={classes.whennull}>
                아직 순위가 없습니다. <br />
                <span>학교계좌로 주식을 사고 1등을 차지하세요!</span>
                <br />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#36938E",
                    fontWeight: 600,
                  }}
                >
                  매일 아침 7시 20분 업데이트
                </span>
              </div>
            )}
          </div>
        </div>
        <div style={{height:50}}></div>
      </div>
    </>
  );
}

export default SchoolDetailPage;
