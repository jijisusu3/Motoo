import { useState, useEffect } from "react";
import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
import classes from "./MyPage.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import { accountsListGet } from "../../stores/accountSlice";
import { nicknamePut, accountChangePut } from "../../stores/userSlice";
import { accountCreate } from "../../stores/accountSlice";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 336,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 5,
};

const modalstyle = {
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
};

function MyPage() {
  const now = dayjs().format("YYYY-MM-DD");
  const standard = dayjs().add(-4, "week").format("YYYY-MM-DD");
  const [nowEdit, setNowEdit] = useState(false);
  const [canAddNum, setCanAddNum] = useState(true);
  const [canAddDate, setCanAddDate] = useState(true);
  const [warningEffect, setWarningEffect] = useState(false);
  const [canStartDay, setCanStartDay] = useState("");
  const [haveShool, setHaveSchool] = useState(false);
  const userData = useSelector((state) => {
    return state.persistedReducer.setUser.user;
  });
  const userToken = useSelector((state) => {
    return state.persistedReducer.setUser.user.token;
  });
  const walletList = useSelector((state) => {
    return state.setAccount.accountsList;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
    dispatch(setActiveNav(2));
  }, []);
  useEffect(() => {
    const data = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    dispatch(accountsListGet(data));
  }, [userToken]);
  const [openCreateModal, setCreateModalOpen] = useState(false);
  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };
  const handleCreateModalClose = () => {
    setAssetInfo({
      assetName: "",
      openReason: "",
    });
    setCreateModalOpen(false);
  };

  const [assetInfo, setAssetInfo] = useState({
    assetName: "",
    openReason: "",
  });

  const onChangeInfo = (e) => {
    setAssetInfo({
      ...assetInfo,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const goToDetail = (e) => {
    const isPk = e.target.id;
    if (Boolean(isPk)) {
      navigate(`/wallet/detail/${isPk}`);
    }
  };

  const [data, setData] = useState({
    config: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
    result: {
      current: "",
    },
  });

  function createSubmit() {
    const data = {
      config: {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
      result: {
        name: "",
      },
    };
    if (!canAddDate) {
      setWarningEffect(true);
      setTimeout(function () {
        setWarningEffect(false);
      }, 400);
      return;
    }
    if (assetInfo.assetName && assetInfo.openReason) {
      data.result.name = assetInfo.assetName;
      dispatch(accountCreate(data));
      setTimeout(() => {
        dispatch(accountsListGet(data.config))
      }, 100);
    }
  }
  const [openChangeModal, setChangeModalOpen] = useState(false);
  const handleChangeModalOpen = (tmpId) => {
    setChangeModalOpen(true);
    setData({
      config: {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
      result: {
        current: tmpId,
      },
    });
  };
  const handleChangeModalClose = () => setChangeModalOpen(false);
  function changeSubmit() {
    dispatch(accountChangePut(data));
    handleChangeModalClose(false);
    setTimeout(() => {
      dispatch(accountsListGet(data.config))
    }, 100);
  }
  function AllAssets() {
    function profitCheck() {
      try {
        if (walletList.earningRaito < 0) {
          return "#4D97ED";
        } else {
          return "#DD4956";
        }
      } catch {
        return "#4D97ED"
      }
    }
    const profitColor = profitCheck();
    return (
      <div className={classes.present}>
        <div>
          <div>총 보유자산</div>
          <div className={classes.cntbox}>
            <img
              src={`${process.env.PUBLIC_URL}/wallet/money.svg`}
              style={{ width: 24, height: 24 }}
              alt=""
            />
            <div className={classes.basebox}>
              {walletList && (
                <div className={classes.count}>
                  {Number(walletList.asset).toLocaleString()}
                </div>
              )}
              <div>원</div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ marginLeft: "10px" }}>수익률</div>
          {walletList.earningRaito && (
            <div
              className={classes.rev}
              style={{
                color: profitColor,
              }}
            >
              {walletList.earningRaito === "NaN"
                ? 0
                : walletList.earningRaito.toFixed(2)}
              %
            </div>
          )}
        </div>
      </div>
    );
  }

  function editOpen() {
    setNowEdit(true);
  }

  function EditShow() {
    const [nickname, setNickname] = useState(userData.data.nickname);
    const handleInputChange = (event) => {
      setNickname(event.target.value);
    };
    // 수정했을때, 이 함수 안에서 POST 요청 들어가야함.
    const handleOnKeyPress = (event) => {
      const data = {
        config: {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        },
        editname: {
          nickname: nickname,
        },
      };
      dispatch(nicknamePut(data));
      setNowEdit(false);
    };
    if (nowEdit) {
      return (
        <div className={classes.accountbox}>
          <img
            src={`${process.env.PUBLIC_URL}/wallet/mypageIcon.svg`}
            style={{ marginRight: "10px" }}
            alt=""
          />
          <input
            style={{ height: "40px", padding: "10px", color: "#242424" }}
            type="text"
            maxLength={8}
            className={classes.editname}
            onChange={handleInputChange}
            value={nickname}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleOnKeyPress();
              }
            }}
          />
          <img
            style={{
              marginRight: "5px",
              width: "32px",
              height: "32px",
              marginTop: "1px",
            }}
            onClick={handleOnKeyPress}
            src={`${process.env.PUBLIC_URL}/wallet/editIcon.svg`}
            alt=""
          />
        </div>
      );
    }
    return (
      <div className={classes.accountbox}>
        <img
          src={`${process.env.PUBLIC_URL}/wallet/mypageIcon.svg`}
          style={{ marginRight: "10px" }}
          alt=""
        />
        <div className={classes.accountname}>
          <p style={{ fontWeight: "700" }}>{nickname}</p>
          <div className={classes.mini}>님의 지갑</div>
          <div>
            <img
              onClick={editOpen}
              style={{ marginLeft: "5px", width: "30px", height: "30px" }}
              src={`${process.env.PUBLIC_URL}/wallet/mypageEdit.svg`}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }

  function WalletAssetCard(asset) {
    setCanAddNum(true);
    var openDate = dayjs(asset.open.slice(0, 10));
    const tmpId = asset.accountId;
    const dateNotAvailable = openDate.isBetween(
      `${now}`,
      `${standard}`,
      undefined,
      "[)"
    );
    if (dateNotAvailable && !asset.isSchool) {
      setCanAddDate(false);
      const tempStandard = openDate.add(4, "week").format("YYYY-MM-DD");
      setCanStartDay(tempStandard);
    }
    if (asset.isSchool) {
      setHaveSchool(true);
    }
    if (asset.num > 1 && !haveShool) {
      // 세개일때 학교대항전 없으면? 꽉참
      setCanAddNum(false);
    } else if (asset.num > 2) {
      // 네개이면?? 무조건 더 못만듦
      setCanAddNum(false);
    }
    if (asset.num === 0) {
      return (
        <div id={tmpId} onClick={goToDetail} className={classes.firstAssetCard}>
          <div className={classes.rowbox}>
            {asset.isSchool && (
              <img
                src={`${process.env.PUBLIC_URL}/wallet/school.svg`}
                alt=""
                style={{ marginRight: "10px" }}
              />
            )}
            <div id={tmpId}>{asset.name}</div>
            <div className={classes.select}>
              <div style={{ color: "white", fontSize: 12, fontWeight: 600 }}>
                now
              </div>
            </div>
          </div>
          <div>{walletList.pitches[asset.num].toLocaleString()}원</div>
        </div>
      );
    } else {
      return (
        <div id={tmpId} onClick={goToDetail} className={classes.otherAssetCard}>
          <div className={classes.rowbox}>
            {asset.isSchool && (
              <img
                src={`${process.env.PUBLIC_URL}/wallet/school.svg`}
                alt=""
                style={{ marginRight: "10px" }}
              />
            )}
            <div id={tmpId}>{asset.name}</div>
          </div>
          <div className={classes.rowbox}>
            <div>{walletList.pitches[asset.num].toLocaleString()}원</div>
            <img
              onClick={() => handleChangeModalOpen(tmpId)}
              src={`${process.env.PUBLIC_URL}/wallet/change.svg`}
              alt=""
              style={{ zIndex: 3, marginLeft: 8 }}
            />
          </div>
        </div>
      );
    }
  }
  return (
    <div className={classes.mypageBG}>
      <div className={classes.mypageCtn}>
        {userData && <EditShow />}
        <div className={classes.centerbox}>
          <AllAssets />
          {walletList.account &&
            walletList.account.map((asset, index) => (
              <WalletAssetCard
                key={asset.accountId}
                name={asset.name}
                accountId={asset.accountId}
                isSchool={asset.school}
                open={asset.created_at}
                num={index}
              />
            ))}
        </div>
        <Modal open={openCreateModal} onClose={handleCreateModalClose}>
          <Box className={classes.createbox} sx={style}>
            <div className={classes.make}>계좌 만들기</div>
            <div>
              <div className={classes.ipttag}>
                계좌 이름{" "}
                <input
                  className={classes.ipt}
                  type="text"
                  name="assetName"
                  onChange={onChangeInfo}
                />
              </div>
              <div className={classes.ipttag}>
                개설 사유{" "}
                <input
                  className={classes.ipt}
                  type="text"
                  name="openReason"
                  onChange={onChangeInfo}
                />
              </div>
            </div>
            {warningEffect ? (
              <div className={classes.vibration}>
                <img
                  src={`${process.env.PUBLIC_URL}/wallet/createMessage.svg`}
                  alt=""
                />
                <div>
                  <p>
                    최대 계좌 개수는 학교대항전 외{" "}
                    <span style={{ fontWeight: "600", color: "#36938E" }}>
                      3개 이하
                    </span>
                    이며
                  </p>
                  <p>신규 계좌 개설은 20영업일(주말 제외)동안 제한됩니다.</p>
                </div>
              </div>
            ) : (
              <div className={classes.notice}>
                <img
                  src={`${process.env.PUBLIC_URL}/wallet/createMessage.svg`}
                  alt=""
                />
                <div>
                  <p>
                    최대 계좌 개수는 학교대항전 외{" "}
                    <span style={{ fontWeight: "600", color: "#36938E" }}>
                      3개 이하
                    </span>
                    이며
                  </p>
                  <p>신규 계좌 개설은 20영업일(주말 제외)동안 제한됩니다.</p>
                </div>
              </div>
            )}
            {!(canStartDay === "") && (
              <p
                style={{
                  color: "#DD4956",
                }}
              >
                {canStartDay} 부터 계좌를 열 수 있어요
              </p>
            )}
            <div className={classes.createbtn} onClick={createSubmit}>
              개설
            </div>
          </Box>
        </Modal>
        <Modal open={openChangeModal} onClose={handleChangeModalClose}>
          <Box className={classes.deletebox} sx={modalstyle}>
            <div className={classes.title}>주계좌를 변경하시겠습니까?</div>
            <div className={classes.graybox}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.43866e-05 9.99846C7.43866e-05 4.47648 4.4766 0 9.99857 0C15.5206 0 19.9971 4.47648 19.9971 9.99846C19.9971 11.641 19.5999 13.2274 18.8523 14.6481L19.9685 18.9358C20.0051 19.0762 20.0051 19.2237 19.9685 19.3642C19.8502 19.8184 19.3861 20.0906 18.9319 19.9724L14.6421 18.8554C13.2229 19.601 11.6387 19.997 9.99857 19.997C4.4766 19.997 7.43866e-05 15.5205 7.43866e-05 9.99846ZM9.99857 4.50078C9.58443 4.50078 9.24868 4.83652 9.24868 5.25067V11.4997C9.24868 11.9139 9.58443 12.2496 9.99857 12.2496C10.4127 12.2496 10.7485 11.9139 10.7485 11.4997V5.25067C10.7485 4.83652 10.4127 4.50078 9.99857 4.50078ZM8.99872 14.4972C8.99872 15.0493 9.44635 15.497 9.99857 15.497C10.5508 15.497 10.9984 15.0493 10.9984 14.4972C10.9984 13.945 10.5508 13.4973 9.99857 13.4973C9.44635 13.4973 8.99872 13.945 8.99872 14.4972Z"
                  fill="#8D8D8D"
                />
              </svg>
              <div style={{ marginLeft: "15px" }}>
                주계좌를 변경하면
                <br />
                해당 계좌에서 모든 거래가 이루어져요.
              </div>
            </div>
            <button className={classes.btn} onClick={changeSubmit}>
              변경하기
            </button>
          </Box>
        </Modal>
        <div className={classes.addbtn}>
          {canAddNum && (
            <img
              className={classes.addbtn}
              onClick={handleCreateModalOpen}
              src={`${process.env.PUBLIC_URL}/wallet/createAssets.svg`}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
