import { useEffect, useState } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import { schoolPageGet } from "../../stores/schoolSlice";
import { schoolBestGet } from "../../stores/stockSlice";
import { useNavigate } from "react-router-dom";

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
    dispatch(schoolPageGet(data));
    dispatch(schoolBestGet(data));
  }, []);

  const navigate = useNavigate();
  function goToSchoolWallet() {
    navigate(`/wallet/detail/${user.data.schoolId}`);
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

  // console.log(mySchoolAsset)

  function MyAssetCard() {
    return (
      <div>
        {/* 왼쪽 */}
        <div>
          <div>{user.nickname}</div>
          {myAsset?.myRank ? <div>{myAsset.asset}원</div> : <></>}
          {myAsset?.myAvg ? (
            <div>
              {myAsset.myAvg === "NaN" ? "0" : myAsset.myAvg.toFixed(2)}%
            </div>
          ) : (
            <></>
          )}
          {myAsset?.myRank ? <div>{myAsset.myRank}원</div> : <></>}
        </div>
        {/* 오른쪽 */}
        <div onClick={goToSchoolWallet}>나의 학교 대항전 보유주식</div>
      </div>
    );
  }

  function MySchoolCard(ranker) {
    const myInfo = ranker.info.split("#");
    if (ranker.ranking === 0) {
      return (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/first.svg`}
            alt=""
          />
          <div>{myInfo[0]}</div>
          <div>{Number(myInfo[1]).toFixed(2)}%</div>
        </div>
      );
    } else if (ranker.ranking === 1) {
      return (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/second.svg`}
            alt=""
          />
          <div>{myInfo[0]}</div>
          <div>{Number(myInfo[1]).toFixed(2)}%</div>
        </div>
      );
    } else if (ranker.ranking === 2) {
      return (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/third.svg`}
            alt=""
          />
          <div>{myInfo[0]}</div>
          <div>{Number(myInfo[1]).toFixed(2)}%</div>
        </div>
      );
    } else {
      return (
        <div>
          <div>{ranker.ranking + 1}</div>
          <div>{myInfo[0]}</div>
          <div>{Number(myInfo[1]).toFixed(2)}%</div>
        </div>
      );
    }
  }
  function MySchoolCards() {
    let firstSlice = mySchoolAsset?.studRanks?.split(":");
    return (
      <div style={{ border: "1px solid red" }}>
        {firstSlice &&
          firstSlice
            .slice(0, 5)
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
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/first.svg`}
            alt=""
          />
          <div>{myInfo[0]}</div>
          <div>{myInfo[1]}</div>
          <div>{Number(myInfo[2]).toFixed(2)}%</div>
        </div>
      );
    } else if (ranker.ranking === 1) {
      return (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/second.svg`}
            alt=""
          />
          <div>{myInfo[0]}</div>
          <div>{myInfo[1]}</div>
          <div>{Number(myInfo[2]).toFixed(2)}%</div>
        </div>
      );
    } else if (ranker.ranking === 2) {
      return (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/third.svg`}
            alt=""
          />
          <div>{myInfo[0]}</div>
          <div>{myInfo[1]}</div>
          <div>{Number(myInfo[2]).toFixed(2)}%</div>
        </div>
      );
    } else {
      return (
        <div>
          <div>{ranker.ranking + 1}</div>
          <div>{myInfo[0]}</div>
          <div>{myInfo[1]}</div>
          <div>{Number(myInfo[2]).toFixed(2)}%</div>
        </div>
      );
    }
  }
  function SigunguPersonalCards() {
    let firstSlice = mySchoolAsset?.sigunguSubResponse?.personal.split(":");
    return (
      <div style={{ border: "1px solid red" }}>
        {firstSlice &&
          firstSlice
            .slice(0, 5)
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
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/first.svg`}
            alt=""
          />
          <div>{myInfo[0]}</div>
          <div>{Number(myInfo[1]).toFixed(2)}%</div>
        </div>
      );
    } else if (ranker.ranking === 1) {
      return (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/second.svg`}
            alt=""
          />
          <div>{myInfo[0]}</div>
          <div>{Number(myInfo[1]).toFixed(2)}%</div>
        </div>
      );
    } else if (ranker.ranking === 2) {
      return (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/third.svg`}
            alt=""
          />
          <div>{myInfo[0]}</div>
          <div>{Number(myInfo[1]).toFixed(2)}%</div>
        </div>
      );
    } else {
      return (
        <div>
          <div>{ranker.ranking + 1}</div>
          <div>{myInfo[0]}</div>
          <div>{Number(myInfo[1]).toFixed(2)}%</div>
        </div>
      );
    }
  }
  function SigunguSchoolCards() {
    let firstSlice = mySchoolAsset?.sigunguSubResponse?.school_ranks.split(":");
    return (
      <div style={{ border: "1px solid red" }}>
        {firstSlice &&
          firstSlice
            .slice(0, 5)
            .map((ranker, index) => (
              <SigunguSchoolCard key={ranker} info={ranker} ranking={index} />
            ))}
      </div>
    );
  }
  console.log(schoolData);
  return (
    <>
      <div>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/medal.svg`}
            alt=""
          />
          <div>
            {schoolData?.eventsResponse?.eventsId ? (
              <div>제 {schoolData.eventsResponse.eventsId}회 학교대항전</div>
            ) : (
              <></>
            )}
            {schoolData?.eventsResponse?.start_date ? (
              <div>
                {schoolData.eventsResponse.start_date.slice(0, 10)}~
                {schoolData.eventsResponse.close_date.slice(0, 10)}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/school.svg`}
            alt=""
          />
          <div>
            {schoolData?.schoolSubResponse?.schoolname ? (
              <div>{schoolData.schoolSubResponse.schoolname}</div>
            ) : (
              <></>
            )}
            {schoolData?.schoolAccResponse?.myRank ? (
              <div>전국 {schoolData.schoolAccResponse.myRank} 등</div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <MyAssetCard />
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/schoolstatic/schoolbus.svg`}
            alt=""
          />
          <div>지금 우리 학교는</div>
        </div>
        <div style={{ border: "2px solid red" }}>
          <div>우리학교</div>
          <div>HOT 주식🔥</div>
          <div>LG디스플레이</div>
        </div>
        <div style={{ border: "2px solid blue" }}>
          {schoolData?.schoolSubResponse?.average ? (
            <div>
              <div>
                {schoolData.schoolSubResponse.average === "NaN"
                  ? "0"
                  : schoolData.schoolSubResponse.average.toFixed(2)}
                %
              </div>
              <div>평균수익률</div>
            </div>
          ) : (
            <></>
          )}
          {schoolData?.schoolSubResponse?.myRank ? (
            <div>
              <div>{schoolData.schoolSubResponse.currentRank}등</div>
              <div>전국</div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          {schoolData?.schoolSubResponse?.schoolname ? (
            <div>{schoolData.schoolSubResponse.schoolname} TOP 5</div>
          ) : (
            <></>
          )}
          <MySchoolCards />
        </div>
        <div>
          {schoolData?.schoolSubResponse?.sigunguSubResponse?.sigungu_name ? (
            <div>
              {schoolData.schoolSubResponse.sigunguSubResponse.sigungu_name}{" "}
              개인 랭킹
            </div>
          ) : (
            <></>
          )}
          <SigunguPersonalCards />
        </div>
        <div style={{ height: 300 }}>
          {schoolData?.schoolSubResponse?.sigunguSubResponse?.sigungu_name ? (
            <div>
              {schoolData.schoolSubResponse.sigunguSubResponse.sigungu_name}{" "}
              학교 랭킹
            </div>
          ) : (
            <></>
          )}
          <SigunguSchoolCards />
        </div>
      </div>
    </>
  );
}

export default SchoolDetailPage;
