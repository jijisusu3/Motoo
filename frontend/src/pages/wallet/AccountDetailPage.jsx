import MyAssets from "../../components/wallet/MyAssets";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./AccountDetailPage.module.css";
import Modal from "@mui/material/Modal";
import RealizedPL from "../../components/wallet/RealizedPL";
import AccountHistory from "../../components/wallet/AccountHistory";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import {
  accountDetailGet,
  accountNamePut,
  accountDelete,
} from "../../stores/accountSlice";

const style = {
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AccountDetailPage() {
  const params = useParams();
  const id = params.id;
  const userToken = useSelector((state) => {
    return state.persistedReducer.setUser.user.token;
  });
  const userCurrent = useSelector((state) => {
    return state.persistedReducer.setUser.user.data.current;
  });
  const accountName = useSelector((state) => {
    return state.setAccount.accountDetail.accountName;
  });
  const isSchool = useSelector((state) => {
    return state.setAccount.accountDetail.school;
  });
  const [value, setValue] = useState(0);
  const [nowEdit, setNowEdit] = useState(false);
  const [openDeleteModal, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  function backToMyWallet() {
    navigate(`/wallet/my`);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
    dispatch(setActiveNav(2));
  }, []);

  const data = {
    config: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
    id: id,
  };
  useEffect(() => {
    dispatch(accountDetailGet(data));
  }, [userToken]);


  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
    setShowSettings(false);
  };
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showSettings, setShowSettings] = useState(false);
  function settingOpen() {
    setShowSettings(true);
  }
  function settingClose() {
    setShowSettings(false);
  }
  function editOpen() {
    setShowSettings(false);
    setNowEdit(true);
  }
  function SettingShow() {
    if (showSettings) {
      return (
        <>
          <div onClick={settingClose} className={classes.exceptSetting} />
          <div className={classes.settingBox}>
            <div
              className={classes.txts}
              style={{ marginBottom: "5px" }}
              onClick={editOpen}
            >
              계좌명 수정
            </div>
            <hr />
            <div
              className={classes.txts}
              style={{ marginTop: "5px" }}
              onClick={handleDeleteModalOpen}
            >
              계좌 삭제
            </div>
          </div>
        </>
      );
    }
  }

  function EditShow() {
    const [editName, setEditName] = useState(accountName);
    const handleInputChange = (event) => {
      setEditName(event.target.value);
    };

    // 수정했을때, 이 함수 안에서 POST 요청 들어가야함.
    const handleOnKeyPress = (event) => {
      const data = {
        config: {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
        result: {
          accountId: Number(id),
          name: editName,
        },
      };
      if (editName) {
        dispatch(accountNamePut(data));
      }

      setNowEdit(false);
    };
    if (nowEdit) {
      return (
        <div>
          <input
            type="text"
            maxLength={8}
            className={classes.editInput}
            onChange={handleInputChange}
            value={editName}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleOnKeyPress();
              }
            }}
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
      <div className={classes.accountname}>
        {editName}
        {isSchool && (
          <img
            src={`${process.env.PUBLIC_URL}/wallet/school.svg`}
            alt=""
            style={{ marginLeft: "10px" }}
          />
        )}
      </div>
    );
  }

  // 삭제했을 때, 남은 자기계좌 있는지 확인후에, 이 함수 안에서 DELETE 요청 들어가야함.
  // 삭제하고나서 redirect해서 지갑 화면으로 돌아가야함
  function deleteSubmit() {
    handleDeleteModalClose(false);
    backToMyWallet();
    const data = {
      config: {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
      id: Number(id),
    };
    dispatch(accountDelete(data));
  }

  return (
    <div className={classes.out}>
      <div className={classes.accdetailctn}>
        <Modal open={openDeleteModal} onClose={handleDeleteModalClose}>
          <Box className={classes.deletebox} sx={style}>
            <div className={classes.title}>정말 삭제하시겠습니까?</div>
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
              <span style={{ marginLeft: "15px" }}>
                계좌를 삭제하면 <br></br> 해당 계좌의 주식, 자산들이 같이
                삭제되어요!
              </span>
            </div>
            {Number(id) === userCurrent ? (
              <div>
                <div style={{color: '#DD4956'}}>주계좌 변경 후 삭제할 수 있어요!</div>
              </div>
            ) : (
              <div className={classes.dltbtn} onClick={deleteSubmit}>
                삭제하기
              </div>
            )}
          </Box>
        </Modal>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <EditShow />
          {!isSchool && (
            <div onClick={settingOpen}>
              <img
                className={classes.dot}
                src={`${process.env.PUBLIC_URL}/wallet/settingIcon.svg`}
                alt=""
              />
            </div>
          )}
        </Grid>
        <div className={classes.hrline}></div>
        <SettingShow />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ "& .MuiTabs-indicator": { bgcolor: "transparent" } }}
            >
              <Tab
                label={
                  <Typography
                    marginLeft="15px"
                    fontSize="18px"
                    fontWeight="600"
                    color={value === 0 ? "#43B8B1" : "#929E9E"}
                    fontFamily="Pretendard"
                  >
                    계좌자산
                  </Typography>
                }
                sx={{
                  "&.Mui-selected": {
                    color: "rgba(0, 0, 0, 0)",
                  },
                }}
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <Typography
                    fontSize="18px"
                    fontWeight="600"
                    color={value === 1 ? "#43B8B1" : "#929E9E"}
                    fontFamily="Pretendard"
                  >
                    판매손익
                  </Typography>
                }
                sx={{
                  "&.Mui-selected": {
                    color: "rgba(0, 0, 0, 0)",
                  },
                }}
                {...a11yProps(1)}
              />
              <Tab
                label={
                  <Typography
                    fontSize="18px"
                    fontWeight="600"
                    color={value === 2 ? "#43B8B1" : "#929E9E"}
                    fontFamily="Pretendard"
                  >
                    거래내역
                  </Typography>
                }
                sx={{
                  "&.Mui-selected": {
                    color: "rgba(0, 0, 0, 0)",
                  },
                }}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <MyAssets />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RealizedPL />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AccountHistory />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default AccountDetailPage;
