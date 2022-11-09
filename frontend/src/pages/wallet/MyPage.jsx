import { useState , useEffect} from "react";
import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
import classes from "./MyPage.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav } from "../../stores/navSlice";
import { nicknamePut } from "../../stores/userSlice";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 344,
  height: 360,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  borderRadius: 5,
};


function MyPage() {
  const now = dayjs().format("YYYY-MM-DD");
  const standard = dayjs().add(-4, "week").format("YYYY-MM-DD");
  const [nowEdit, setNowEdit] = useState(false);
  // + 버튼 넣어줄지 판단 인덱스로
  const [canAddNum, setCanAddNum] = useState(true);
  const [canAddDate, setCanAddDate] = useState(true);
  const [warningEffect, setWarningEffect] = useState(false);
  const [canStartDay, setCanStartDay] = useState("")
  
  const [haveShool, setHaveSchool] = useState(false);
  const userData = useSelector((state) => {
    return state.persistedReducer.setUser.user
  })
  const dispatch = useDispatch();
  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
  });
  
  const [openCreateModal, setCreateModalOpen] = useState(false);
  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
    // setShowSettings(false);
  };
  const handleCreateModalClose = () => setCreateModalOpen(false);
  
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
  
  const navigate = useNavigate()
  const goToDetail = (e) => {
    const isPk = e.target.id
    if (Boolean(isPk)) {
      navigate(`/wallet/detail/${isPk}`)
    }
  }


  function createSubmit() {
    if (!canAddDate) {
      setWarningEffect(true);
      setTimeout(function(){
        setWarningEffect(false)
      }, 400)
      return;
    }
    handleCreateModalClose(false);
  }

  const [openChangeModal, setChangeModalOpen] = useState(false);
  const handleChangeModalOpen = () => {
    setChangeModalOpen(true);
  };
  const handleChangeModalClose = () => setChangeModalOpen(false);
  function changeSubmit() {
    // 걍바꿔주기~
    handleChangeModalClose(false);
  }

  const [data, setData] = useState({
    all: {
      all_asset: 602520021,
      profit: -13,
    },
    assets: [
      {
        accounts_pk: 18992,
        seed: 405219228,
        open: "2020-07-21",
        isSchool: false,
        name: "유저의첫번째계좌",
      },
      {
        accounts_pk: 1892,
        seed: 405219228,
        open: "2022-09-01",
        isSchool: true,
        type: 1,
        name: "학교대항전",
      },
      {
        accounts_pk: 18921,
        seed: 405219228,
        open: "2022-10-21",
        isSchool: false,
        type: 1,
        name: "유저의두번째계좌",
      },
      // {
      //   accounts_pk: 1891221,
      //   seed: 405219228,
      //   open: "2021-11-21",
      //   isSchool: false,
      //   type: 1,
      //   name: "유저의세번째계좌",
      // },
    ],
  });

  function AllAssets() {
    function profitCheck() {
      if (data.all.profit < 0) {
        return "#4D97ED";
      } else {
        return "#DD4956";
      }
    }
    const profitColor = profitCheck();
    return (
      <div className={classes.present}>
        <div>
          <div>총 보유자산</div>
          <div className={classes.cntbox}>
            <img src={`${process.env.PUBLIC_URL}/wallet/money.svg`} style={{ width: 24, height: 24 }} alt="" />
            <div  className={classes.basebox}>
              <div className={classes.count}>{data.all.all_asset}</div>
              <div>원</div>
            </div>
          </div>
        </div>
        <div>
          <div>수익률</div>
          <div className={classes.rev}
            style={{
              color: profitColor,
            }}
          >
            {data.all.profit}%
          </div>
        </div>
      </div>
    );
  }

  function editOpen() {
    setNowEdit(true);
  }

  function EditShow() {
    const [nickname, setNickname] = useState(userData.data.nickname)
    const handleInputChange = (event) => {
      setNickname(event.target.value);
      // console.log(nickname)
    };
    // 수정했을때, 이 함수 안에서 POST 요청 들어가야함.
    const handleOnKeyPress = (event) => {
      const data = {
        config: {
          headers: {
            Authorization: `Bearer ${userData.token}`
          }
        },
        editname: {
          nickname: nickname
        }
      }
      dispatch(nicknamePut(data))
      setNowEdit(false);
    };
    if (nowEdit) {
      return (
        <div className={classes.accountbox}>
          <img
            onClick={handleOnKeyPress}
            src={`${process.env.PUBLIC_URL}/wallet/mypageIcon.svg`}
            alt=""
          />
          <input
            type="text"
            maxLength={8}
            className={classes.editname}
            onChange={handleInputChange}
            value={nickname}
            onKeyPress={handleOnKeyPress}
          />
          <img
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
          onClick={handleOnKeyPress}
          src={`${process.env.PUBLIC_URL}/wallet/mypageIcon.svg`}
          alt=""
        />
        <div className={classes.accountname}>
          {nickname}
          <div className={classes.mini}>님의 지갑</div>
          <div>
            <img
              onClick={editOpen}
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
    // setAssetNameList([...assetNameList, asset.name])
    // console.log(assetNameList)
    var openDate = dayjs(asset.open);
    const tmpId = asset.accountId
    const dateAvailable = openDate.isBetween(
      `${now}`,
      `${standard}`,
      undefined,
      "[)"
    );
    if (dateAvailable) {
      setCanAddDate(false);
      const tempStandard = openDate.add(4, "week").format("YYYY-MM-DD");
      setCanStartDay(tempStandard)
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
          {asset.isSchool && (
            <img src={`${process.env.PUBLIC_URL}/wallet/school.svg`} alt="" />
          )}
          <div id={tmpId}>{asset.name}</div>
          <div className={classes.select}>
            <div style={{ color: "white", fontSize: 12, fontWeight: 600 }}>
              now
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id={tmpId} onClick={goToDetail} className={classes.otherAssetCard}>
          <div className={classes.rowbox}>
            {asset.isSchool && (
              <img src={`${process.env.PUBLIC_URL}/wallet/school.svg`} alt="" />
            )}
            <div id={tmpId}>{asset.name}</div>
          </div>
          <img
            onClick={handleChangeModalOpen}
            src={`${process.env.PUBLIC_URL}/wallet/change.svg`}
            alt=""
            style={{zIndex:3}}
          />
        </div>
      );
    }
  }
  return (
    <div className={classes.mainbox}>
      <h1>마이페이지임니다</h1>
      {userData && <EditShow />}
      <div className={classes.centerbox}>
        <AllAssets />
        {data.assets.map((asset, index) => (
          <WalletAssetCard
            key={asset.accounts_pk}
            name={asset.name}
            accountId={asset.accounts_pk}
            seed={asset.seed}
            isSchool={asset.isSchool}
            open={asset.open}
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
              <input className={classes.ipt} type="text" name="assetName" onChange={onChangeInfo} />
            </div>
            <div className={classes.ipttag}>
              개설 사유{" "}
              <input className={classes.ipt} type="text" name="openReason" onChange={onChangeInfo} />
            </div>
          </div>
          {warningEffect ? (
            <div className={classes.vibration}>
              <img src={`${process.env.PUBLIC_URL}/wallet/createMessage.svg`} alt="" />
              <div>
                <p>최대 계좌 개수는 학교대항전 외 3개 이하이며</p>
                <p>신규 계좌 개설은 20영업일(주말 제외)동안 제한됩니다.</p>
              </div>
            </div>
          ):(
            <div className={classes.notice}>
            <img src={`${process.env.PUBLIC_URL}/wallet/createMessage.svg`} alt="" />
            <div>
              <p>최대 계좌 개수는 학교대항전 외 3개 이하이며</p>
              <p>신규 계좌 개설은 20영업일(주말 제외)동안 제한됩니다.</p>
            </div>
          </div>
          )}
          {!(canStartDay==="") && (
            <p style={{color:'#DD4956'}}>{canStartDay} 부터 계좌를 열 수 있어요</p>
          )}
          <div className={classes.createbtn} onClick={createSubmit}>개설</div>
        </Box>
      </Modal>
      <Modal open={openChangeModal} onClose={handleChangeModalClose}>
        <Box sx={style}>
          <div>정말 변경하시겠습니까?</div>
          <div>계좌를 변경하면 ~~~되어요!</div>
          <button onClick={changeSubmit}>변경하기</button>
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
  );
}

export default MyPage;
