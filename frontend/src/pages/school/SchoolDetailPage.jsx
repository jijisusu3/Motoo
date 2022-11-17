import { useEffect, useState } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import { schoolPageGet } from "../../stores/schoolSlice";
import { schoolBestGet } from "../../stores/stockSlice";
import { useNavigate } from "react-router-dom";
import classes from "./SchoolDetailPage.module.css";
import { fontWeight } from "@mui/system";

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
  function goToSchoolWallet() {
    navigate(`/wallet/detail/${user.data.schoolId}`);
  }
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
  console.log(hotStock);

  function MyAssetCard() {
    return (
      <div className={classes.myrowbox}>
        {/* 왼쪽 */}
        <div className={classes.mycard}>
          <div className={classes.myrowbox}>
            <div>{user.data.nickname}</div>
            <div className={classes.rowbox}>
              <img
                src={`${process.env.PUBLIC_URL}/wallet/coin.svg`}
                style={{ width: 15, marginRight: 4 }}
                alt=""
              />
              {myAsset?.asset ? <div>{myAsset.asset}원</div> : <></>}
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
  console.log(schoolData);
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
                  {schoolData.eventsResponse.start_date.slice(0, 10)}&nbsp;~&nbsp; 
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
            </div>
            {schoolData?.schoolAccResponse?.myRank ? (
              <div className={classes.rowbox}>
                <div style={{ fontWeight: "400", fontSize: "13px"}}>지역</div>
                <div className={classes.rank}>
                  {schoolData.schoolAccResponse.myRank}
                </div>
                <div style={{ fontWeight: "400", fontSize: "13px"}}>등</div>
              </div>
            ) : (
              <div className={classes.rowbox}>
                <div style={{ fontWeight: "400", fontSize: "13px"}}>지역</div>
                <div className={classes.rank}>???&nbsp;</div>
                <div style={{ fontWeight: "400", fontSize: "13px"}}>등</div>
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
                  구매주식없음
                </div>
              </div>
            )}
            <div className={classes.rankingBox}>
              <div className={classes.rankingRatioBox}>
                {schoolData?.schoolSubResponse?.average === !null ? (
                  <div>
                    <div style={{ marginLeft: "12px"}}>
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
                    <div style={{ marginLeft: "12px"}}>
                      <div style={{ display: "inline", fontSize: 28 }}>?</div>
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
                    <div style={{ display: "inline", fontSize: 28, marginLeft: "10px" }}>
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
                      전국
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "inline", fontSize: 28, marginLeft: "10px" }}>?</div>
                    <div style={{ display: "inline", fontSize: 18 }}>등</div>
                    <div
                      style={{ marginTop: 6, fontSize: 10, color: "#FE8289" }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/schoolstatic/deco.svg`}
                        alt=""
                        style={{ marginRight: 2 }}
                      />
                      전국
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
            {mySchoolAsset?.studRanks === !null ? (
              <MySchoolCards />
            ) : (
              <div className={classes.whennull}>아직 순위가 없습니다. <br />
              <span>학교계좌로 주식을 사고 1등을 차지하세요!</span><br />
              <span style={{ fontSize: "12px", color: "#36938E", fontWeight: 600}}>매일 아침 7시 20분 업데이트</span></div>
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
            {mySchoolAsset?.sigunguSubResponse?.personal === !null ? (
              <SigunguPersonalCards />
            ) : (
              <div className={classes.whennull}>아직 순위가 없습니다. <br />
              <span>학교계좌로 주식을 사고 1등을 차지하세요!</span><br />
              <span style={{ fontSize: "12px", color: "#36938E", fontWeight: 600}}>매일 아침 7시 20분 업데이트</span></div>
            )}
          </div>
          <div style={{ height: 300 }}>
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
            {mySchoolAsset?.sigunguSubResponse?.school_ranks === !null ? (
              <SigunguSchoolCards />
            ) : (
              <div className={classes.whennull}>아직 순위가 없습니다. <br />
              <span>학교계좌로 주식을 사고 1등을 차지하세요!</span><br />
              <span style={{ fontSize: "12px", color: "#36938E", fontWeight: 600}}>매일 아침 7시 20분 업데이트</span></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SchoolDetailPage;
