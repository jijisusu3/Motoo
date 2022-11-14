import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./BuyOrderEditPage.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setShowNav } from "../../stores/navSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  shortStockGet,
  limitOrderPut,
  limitOrderDelete,
} from "../../stores/stockSlice";

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
  const tradeId = Number(dataList[3]);
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
      tradeId: tradeId,
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
        <span class={classes.buyNumber} onClick={priceClickHandler}>
          {writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <span class={classes.howMuchWant}>얼마로 변경할까요?</span>
        </span>
      );
    } else {
      return (
        <>
          <span class={classes.buyNumber} onClick={priceClickHandler}>
            {wantedPrice}
          </span>
          {writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <span class={classes.zuOrwon}>원</span>
        </>
      );
    }
  }
  function ManyInput() {
    if (wantedMany === "") {
      return (
        <div class={classes.buyNumber} onClick={manyClickHandler}>
          {!writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <span class={classes.howMuchWant}>몇 주로 변경할까요?</span>
        </div>
      );
    } else {
      return (
        <>
          <div class={classes.buyNumber} onClick={manyClickHandler}>
            {wantedMany}

            {!writePrice && (
              <img
                className={classes.blinking}
                src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
                alt=""
              />
            )}
            <span class={classes.zuOrwon}>주</span>
          </div>
        </>
      );
    }
  }
  function submitEdit() {
    // 현재가로 주문, 개수입력
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
        tradeId: tradeId,
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
        <hr />
      </div>

      <div class={classes.total}>
        <div class={classes.realPriceRadio}>
          <div>
            <PriceInput />
          </div>

          <img
            class={classes.hogaButton}
            onClick={handleDeleteModalOpen}
            src={`${process.env.PUBLIC_URL}/stock-list/trashcan.svg`}
            alt=""
          />
        </div>
        <div class={classes.manyInput}>
          <ManyInput />
        </div>
        {/* <PriceInput />
        <ManyInput /> */}

        {isTooHigh && <p>그렇게 비싸겐 못사요</p>}

        {isTooLow && <p>그렇게 싸겐 못사요</p>}
        {!isAvailable && <p>넌 그만큼 살 돈이 없어요 </p>}
      </div>

      <div class={classes.buyButtom}>
        <div class={classes.numberSection}>
          <div>
            <button
              value={1}
              class={classes.numberButton}
              onClick={numberClick}
            >
              1
            </button>
            <button
              value={2}
              class={classes.numberButton}
              onClick={numberClick}
            >
              2
            </button>
            <button
              value={3}
              class={classes.numberButton}
              onClick={numberClick}
            >
              3
            </button>
          </div>
          <div>
            <button
              value={4}
              class={classes.numberButton}
              onClick={numberClick}
            >
              4
            </button>
            <button
              value={5}
              class={classes.numberButton}
              onClick={numberClick}
            >
              5
            </button>
            <button
              value={6}
              class={classes.numberButton}
              onClick={numberClick}
            >
              6
            </button>
          </div>
          <div>
            <button
              value={7}
              class={classes.numberButton}
              onClick={numberClick}
            >
              7
            </button>
            <button
              value={8}
              class={classes.numberButton}
              onClick={numberClick}
            >
              8
            </button>
            <button
              value={9}
              class={classes.numberButton}
              onClick={numberClick}
            >
              9
            </button>
          </div>

          <div>
            <button class={classes.numberButton} id={classes.lastNumber}>
              ``
            </button>
            <button
              value={0}
              class={classes.numberButton}
              onClick={numberClick}
            >
              0
            </button>
            <button class={classes.numberButton} onClick={numberClick}>
              <img
                value="삭제"
                src={`${process.env.PUBLIC_URL}/stock-detail/eraser.svg`}
                alt=""
              />
            </button>
          </div>
        </div>
        <div class={classes.buyButtonDiv} onClick={submitEdit}>
          <button class={classes.buyButton}>살래요 수정</button>
        </div>
      </div>

      <Modal open={openDeleteModal} onClose={handleDeleteModalClose}>
        <Box className={classes.deletebox} sx={style}>
          <div className={classes.title}>정말 삭제하시겠습니까??</div>
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
              구매 주문을 취소하면
              <br />
              사용가능한 씨드가 재설정됩니다!
            </div>
          </div>
          <button className={classes.btn} onClick={deleteSubmit}>
            삭제하기
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default BuyOrderEditPage;
