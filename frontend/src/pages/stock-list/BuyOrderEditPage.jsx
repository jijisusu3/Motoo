import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./BuyOrderEditPage.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setShowNav } from "../../stores/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { shortStockGet, limitOrderPut, limitOrderDelete } from "../../stores/stockSlice";

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

function BuyOrderEditPage() {
  const params = useParams();
  const dataList = params.id.split(":");
  const tradeId = Number(dataList[3])
  const [wantedPrice, setWantedPrice] = useState(dataList[1]);
  const [wantedMany, setWantedMany] = useState(dataList[2]);
  const [writePrice, setWritePrice] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isTooHigh, setIsTooHigh] = useState(false);
  const [isTooLow, setIsTooLow] = useState(false);
  const [total, setTotal] = useState(0);
  const [openDeleteModal, setDeleteModalOpen] = useState(false);

  const tradeData = useSelector((state) => {
    return state.setStock.shortStockData;
  });
  const userData = useSelector((state) => {
    return state.persistedReducer.setUser.user;
  });
  const mySeed = userData.data.seed;
  console.log(tradeData);
  const navigate = useNavigate();
  function backToLimitOrderList() {
    navigate(`/stock/limit-order`);
  }

  useEffect(() => {
    dispatch(shortStockGet(dataList[0]));
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
  }, []);

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  // 삭제확인 눌렀을 때,
  function deleteSubmit() {
    const data = {
      config: {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      },
      tradeId: tradeId
    };
    dispatch(limitOrderDelete(data));
    handleDeleteModalClose(false);
    setTimeout(() => {
      backToLimitOrderList();
    }, 70);
  }

  const numberClick = (event) => {
    setIsTooLow(false);
    const tempPrice = Number(wantedPrice + event.target.value);
    const tempMany = Number(wantedMany + event.target.value);
    // 가격 입력중일때
    if (writePrice) {
      if (Boolean(event.target.value)) {
        if (wantedPrice === "") {
          if (event.target.value === "0") {
            return;
          }
        }
        if (tempPrice > tradeData.maximum) {
          // 상한가보다 클때
          setIsTooHigh(true);
          setTimeout(() => {
            setIsTooHigh(false);
          }, 1000);
          return;
        } else if (tempPrice < tradeData.minimum) {
          // 하한가보다 낮을때
          setIsTooLow(true);
        }
        if (Boolean(wantedMany)) {
          //주식개수랑 가격입력모두되었을 때,
          if (tempPrice * Number(wantedMany) > mySeed) {
            setIsAvailable(false);
            setTimeout(() => {
              setIsAvailable(true);
            }, 1000);
            return;
          } else {
            setIsAvailable(true);
            setTotal(tempPrice * Number(wantedMany));
            console.log(typeof total);
          }
        }
        setWantedPrice(wantedPrice + event.target.value);
      } else {
        if (wantedPrice !== "") {
          const tmp = wantedPrice.slice(0, -1);
          const tmpNum = Number(tmp);
          if (tmpNum < tradeData.minimum) {
            // 하한가보다 낮을때
            setIsTooLow(true);
          }
          setWantedPrice(tmp);
        }
      }
    } else {
      // 주식개수 입력중일때
      if (Boolean(event.target.value)) {
        if (wantedMany === "") {
          if (event.target.value === "0") {
            return;
          }
        }
        if (Number(wantedPrice) * tempMany > mySeed) {
          setIsAvailable(false);
          setTimeout(() => {
            setIsAvailable(true);
          }, 1000);
          return;
        } else {
          if (tradeData.price * Number(wantedMany) > mySeed) {
            setIsAvailable(false);
            setTimeout(() => {
              setIsAvailable(true);
            }, 1000);
            return;
          } else {
            setIsAvailable(true);
            setTotal(tradeData.price * Number(wantedMany));
          }
        }
        setWantedMany(String(tempMany));
      } else {
        if (wantedMany !== "") {
          const tmp = wantedMany.slice(0, -1);
          setWantedMany(tmp);
        }
      }
    }
  };

  const priceClickHandler = () => {
    console.log("가격누름");
    setWritePrice(true);
  };
  const manyClickHandler = () => {
    console.log("개수누름");
    setWritePrice(false);
  };
  function PriceInput() {
    // 직접입력하겠다고 할 때,
    if (wantedPrice === "") {
      return (
        <div onClick={priceClickHandler}>
          {writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <h1>얼마로 변경할까요?</h1>
        </div>
      );
    } else {
      return (
        <>
          <span onClick={priceClickHandler}>{wantedPrice}</span>
          {writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <span>원</span>
        </>
      );
    }
  }
  function ManyInput() {
    if (wantedMany === "") {
      return (
        <div onClick={manyClickHandler}>
          {!writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <h1>몇 주로 변경할까요?</h1>
        </div>
      );
    } else {
      return (
        <>
          <p onClick={manyClickHandler}>{wantedMany}</p>
          {!writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <span>주</span>
        </>
      );
    }
  }
  function submitEdit() {
    // 현재가로 주문, 개수입력
    console.log('하하')
    if (Boolean(wantedMany) && !isTooLow) {
      const data = {
        config: {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        },
        result: {
          tr_amount: String(wantedMany),
          tr_price: String(tradeData.price),
        },
        tradeId: tradeId
      };
      dispatch(limitOrderPut(data));
      setTimeout(() => {
        backToLimitOrderList();
      }, 70);
    }
  }
  return (
    <div>
      <div>
        <div className={classes.info}>
          <img
            className={classes.pd}
            src={`${process.env.PUBLIC_URL}/grayBack.svg`}
            alt=""
            onClick={backToLimitOrderList}
          />
          <div>
            <div>{tradeData.name}</div>
          </div>
        </div>
      </div>
      <hr />
      <img
        onClick={handleDeleteModalOpen}
        src={`${process.env.PUBLIC_URL}/stock-list/trashcan.svg`}
        alt=""
      />
      <hr />
      <PriceInput />
      <ManyInput />
      {isTooHigh && <p>그렇게 비싸겐 못사요</p>}
      {isTooLow && <p>그렇게 싸겐 못사요</p>}
      {!isAvailable && <p>넌 그만큼 살 돈이 없어요</p>}
      <div class="numberSection">
        <button value={1} class="number" onClick={numberClick}>
          1
        </button>
        <button value={2} class="number" onClick={numberClick}>
          2
        </button>
        <button value={3} class="number" onClick={numberClick}>
          3
        </button>
        <button value={4} class="number" onClick={numberClick}>
          4
        </button>
        <button value={5} class="number" onClick={numberClick}>
          5
        </button>
        <button value={6} class="number" onClick={numberClick}>
          6
        </button>
        <button value={7} class="number" onClick={numberClick}>
          7
        </button>
        <button value={8} class="number" onClick={numberClick}>
          8
        </button>
        <button value={9} class="number" onClick={numberClick}>
          9
        </button>
        <button value={0} class="number" onClick={numberClick}>
          0
        </button>
        <button class="number" onClick={numberClick}>
          <img
            value="삭제"
            src={`${process.env.PUBLIC_URL}/stock-detail/eraser.svg`}
            alt=""
          />
        </button>
      </div>
      <div onClick={submitEdit}>
        <div>수정</div>
      </div>
      <Modal open={openDeleteModal} onClose={handleDeleteModalClose}>
        <Box sx={style}>
          <p>정말 삭제하시겠습니까?</p>
          <p>구매 주문을 취소하면 사용가능한 씨드가 재설정됩니다!</p>
          <button onClick={deleteSubmit}>삭제하기</button>
        </Box>
      </Modal>
    </div>
  );
}

export default BuyOrderEditPage;
