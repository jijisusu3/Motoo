import { useEffect, useState } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import { schoolGet, schoolPut } from "../../stores/schoolSlice";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "35%",
  left: "50%",
  width: "88%",
  height: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

function SchoolMainPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <div>{item.schoolname}</div>
            <div>
              {item.sigunguResponse.sido} {item.sigunguResponse.sigungu_name}
            </div>
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
      console.log(choicedId);
      const data = {
        config: {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
        result: {
          id: choicedId
        }
      };
      dispatch(schoolPut(data));
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
              id: results.results[0].schoolId
            }
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
    <div>
      <img src={`${process.env.PUBLIC_URL}/school/schoolmain.svg`} alt="" />
      <div onClick={onClickHandler} style={{ border: "1px solid blue" }}>
        학교 등록하고 참여하기 ▶
      </div>
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
            <div>학교 등록하기</div>
            <input
              type="text"
              autoFocus
              value={keyword || ""}
              onChange={(e) => updateField("keyword", e.target.value)}
              placeholder="학교이름을 입력해주세요."
            />
            <div
              style={{
                overflow: "auto",
                width: "80%",
                height: "60%",
                border: "1px solid red",
              }}
            >
              <SearchBar />
            </div>
            {!isGetId && <div>학교를 선택하세요!</div>}
            <div
              onClick={startClick}
              style={{ width: "50%", backgroundColor: "gray" }}
            >
              시작하기
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SchoolMainPage;
