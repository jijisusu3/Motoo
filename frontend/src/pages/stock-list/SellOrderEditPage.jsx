import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./SellOrderEditPage.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav } from "../../stores/navSlice";
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

function SellOrderEditPage() {
  const params = useParams();
  const dataList = params.id.split(":");
  const tradeId = Number(dataList[3]);
  const [ myStock, setMyStock ] = useState(0);
  const tradeData = useSelector((state) => {
    return state.setStock.shortStockData;
  });
  const userData = useSelector((state) => {
    return state.persistedReducer.setUser.user;
  });
  useEffect(() => {
    userData.haveList.forEach((element) => {
      if (element.ticker === dataList[0]) {
        setMyStock(element.available + Number(wantedMany));
      }
    });
  }, [userData])
  const [wantedPrice, setWantedPrice] = useState(dataList[1]);
  const [wantedMany, setWantedMany] = useState(dataList[2]);
  const [writePrice, setWritePrice] = useState(false);
  const [isHave, setIsHave] = useState(true);
  const [isTooHigh, setIsTooHigh] = useState(false);
  const [isTooLow, setIsTooLow] = useState(false);
  const [total, setTotal] = useState(0);
  const [openDeleteModal, setDeleteModalOpen] = useState(false);

  const navigate = useNavigate();
  function backToLimitOrderList() {
    navigate(`/stock/limit-order`);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
  });
  useEffect(() => {
    dispatch(shortStockGet(dataList[0]));
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
    }, 200);
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
          setIsTooLow(false);
          setTimeout(() => {
            setIsTooHigh(false);
          }, 1000);
          if (Number(wantedPrice) <= tradeData.minimum) {
            setIsTooLow(true);
          }
          return;
        } else if (tempPrice < tradeData.minimum) {
          // 하한가보다 낮을때
          setIsTooLow(true);
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
        if (tempMany > myStock) {
          // 내가 가진것보다 팔려고 입력한게 클때
          setIsHave(false);
          setTimeout(() => {
            setIsHave(true);
          }, 1000);
          return;
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
    setWritePrice(true);
  };
  const manyClickHandler = () => {
    setWritePrice(false);
  };
  function PriceInput() {
    // 직접입력하겠다고 할 때,
    if (wantedPrice === "") {
      return (
        <div class={classes.howmuch1} onClick={priceClickHandler}>
          {writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <span>얼마로 변경할까요?</span>
        </div>
      );
    } else {
      return (
        <>
          <div class={classes.howmuch2} onClick={priceClickHandler}>
            {wantedPrice}
            {writePrice && (
              <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
              />
              )}
          <span>원</span>
          </div>
        </>
      );
    }
  }
  function ManyInput() {
    if (wantedMany === "") {
      return (
        <div class={classes.howmuch1} onClick={manyClickHandler}>
          {!writePrice && (
            <img
              className={classes.blinking}
              src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
              alt=""
            />
          )}
          <span>몇 주로 변경할까요?</span>
        </div>
      );
    } else {
      return (
        <>
          <div class={classes.howmuch2} onClick={manyClickHandler}>
            {wantedMany}
            {!writePrice && (
              <img
                className={classes.blinking}
                src={`${process.env.PUBLIC_URL}/stock-detail/inputIcon.svg`}
                alt=""
              />
            )}
            <span>주</span>
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
      }, 200);
    }
  }
  return (
    <div>
      <div style={{marginBottom: "20px"}} className={classes.buynav}>
        <div>
          <img
            onClick={backToLimitOrderList}
            src={`${process.env.PUBLIC_URL}/grayBack.svg`}
            alt=""
          />
          </div>
          <p className={classes.buyname}>{tradeData.name}</p>
          <div></div>
        </div>
        <hr />

        <div class={classes.bigctn}>
          <div class={classes.middlectn}>
            <div className={classes.middlesubctn}>
              <PriceInput />
              <ManyInput />
              <div style={{ fontSize: "14px", marginTop: "5px", color: "#4E5E5E", fontWeight: "600"}}><img src={`${process.env.PUBLIC_URL}/wallet/egg.svg`} style={{ marginBottom: '2px', marginLeft: '2px', marginRight: '10px', width: 12, height: 12 }} alt="" />최대 {myStock}주 입력가능</div>
              <div class={classes.inputalrt}>
                {isTooLow === true && isTooHigh === false && (
                  <p>그렇게 싸겐 못팔아요</p>
                )}
                {!isHave && <p>판매 가능한 개수를 초과했어요!</p>}
                {isTooHigh === true && <p>그렇게 비싸겐 팔아요</p>}
              </div>
            </div>
            <div>
              <img
                class={classes.hogaButton}
                onClick={handleDeleteModalOpen}
                src={`${process.env.PUBLIC_URL}/trash.svg`}
                alt=""
              />
            </div>
          </div>


        <div class={classes.numberctn}>
          <div class={classes.numberbtns}>
            <div>
              <button
                value={1}
                class={classes.numberbtn}
                onClick={numberClick}
              >
                1
              </button>
              <button
                value={2}
                class={classes.numberbtn}
                onClick={numberClick}
              >
                2
              </button>
              <button
                value={3}
                class={classes.numberbtn}
                onClick={numberClick}
              >
                3
              </button>
            </div>
            <div>
              <button
                value={4}
                class={classes.numberbtn}
                onClick={numberClick}
              >
                4
              </button>
              <button
                value={5}
                class={classes.numberbtn}
                onClick={numberClick}
              >
                5
              </button>
              <button
                value={6}
                class={classes.numberbtn}
                onClick={numberClick}
              >
                6
              </button>
            </div>
            <div>
              <button
                value={7}
                class={classes.numberbtn}
                onClick={numberClick}
              >
                7
              </button>
              <button
                value={8}
                class={classes.numberbtn}
                onClick={numberClick}
              >
                8
              </button>
              <button
                value={9}
                class={classes.numberbtn}
                onClick={numberClick}
              >
                9
              </button>
            </div>

            <div>
              <button style={{color:"white"}} className={classes.numberbtn}>
                0
              </button>
              <button
                value={0}
                class={classes.numberbtn}
                onClick={numberClick}
              >
                0
              </button>
              <button class={classes.numberbtn} onClick={numberClick}>
                <img
                  value="삭제"
                  src={`${process.env.PUBLIC_URL}/stock-detail/eraser.svg`}
                  alt=""
                />
              </button>
            </div>
            <div onClick={submitEdit}>
              <button class={classes.sellbutton}>매도 가격 수정하기</button>
            </div>
          </div>
        </div>

      

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
              <div style={{ marginLeft: "15px" }}>
                판매를 취소하면
                <br />
                판매가능한 주식 수가 재설정됩니다.
              </div>
            </div>
            <button className={classes.btn} onClick={deleteSubmit}>
              삭제하기
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default SellOrderEditPage;
