import { useEffect, useState } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import { schoolGet } from "../../stores/schoolSlice";
import { schoolPut } from "../../stores/userSlice";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import classes from "./SchoolMainPage.module.css";

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

function SchoolMainPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const isBattle = useSelector((state) => {
    return state.persistedReducer.setUser.user.data.schoolId;
  });
  useEffect(()=> {
    if (isBattle) {
      navigate(`/school-battle`);
    } else {
      const now = window.location.pathname;
      dispatch(setActiveNav(3));
      dispatch(setShowNav(now));
    }
  }, [])

  const [keyword, setKeyword] = useState();
  const [results, setResult] = useState([]);
  const [choicedId, setChoicedId] = useState();
  const [isGetId, setIsGetId] = useState(true);

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
            // className={`search-preview ${item.index === 0 ? "start" : ""}`}
          >
            <div className={classes.sidoList}>
              <div className={classes.sido}>
                <p>{item.sigunguResponse.sido} {item.sigunguResponse.sigungu_name}</p>
              </div>
              {/* <div className={classes.sigungu}>
                <p></p>
              </div> */}
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

  const dispatch = useDispatch();
  const userToken = useSelector((state) => {
    return state.persistedReducer.setUser.user.token;
  });

  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
    dispatch(setActiveNav(3));
  }, []);

  function onClickHandler() {
    const data = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    dispatch(schoolGet(data));
    handleOpen();
  }

  function startClick() {
    //학교 결과 클릭했을 때,
    if (choicedId) {
      const data = {
        config: {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
        result: {
          id: choicedId,
        },
      };
      dispatch(schoolPut(data));
      setTimeout(() => {
        navigate('/school-battle')
      }, 50);
    } else {
      // 결과 하나만 남았을 때,
      if (results.results) {
        if (results.results.length === 1) {
          const data = {
            config: {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            },
            result: {
              id: results.results[0].schoolId,
            },
          };
          dispatch(schoolPut(data));
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
    <div className={classes.schoolOutDiv}>
      <div className={classes.schoolMainDiv}>
        <img src={`${process.env.PUBLIC_URL}/schoolstatic/schoolmain.svg`} alt="" />
        <button
          onClick={onClickHandler}
          className={classes.schoolRegisterButton}
        >
          학교 등록하고 참여하기 ▶
        </button>
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
              <div style={{marginTop: "5px",marginBottom: "30px"}}className={classes.schoolText}>학교 등록하기</div>
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
              {/* <input
                  type="text"
                  autoFocus
                  value={keyword || ""}
                  onChange={(e) => updateField("keyword", e.target.value)}
                  placeholder="학교이름을 입력해주세요."
                /> */}
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
                시작하기
              </button>
              <div>
                {!isGetId && <div className={classes.schoolaler}>학교를 선택하세요!</div>}
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default SchoolMainPage;
