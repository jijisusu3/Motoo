import React, { useState, useEffect } from "react";
import classes from "./LimitOrderPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav } from "../../stores/navSlice";
import { limitListGet } from "../../stores/stockSlice";
import { realtimeAccountGet } from "../../stores/userSlice";

function LimitOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state.persistedReducer.setUser.user;
  });
  const orderList = useSelector((state) => {
    return state.setStock.limitList;
  });
  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
  }, []);
  const tmpData = {
    config: {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    },
    id: userData.data.current,
  };
  useEffect(() => {
    dispatch(limitListGet(tmpData));
    dispatch(realtimeAccountGet(tmpData));
  }, []);

  function backToStockList() {
    navigate(`/`);
  }
  function MyRealizedCard(stock) {
    let go = 'sell'
    let isSell = false;
    console.log(stock.differ);
    const tmpparams =
      stock.ticker + ":" + stock.price + ":" + stock.many + ":" + stock.id;

      if (stock.differ === 4) {
        isSell = false
        go = 'buy'
      } else if (stock.differ === 3) {
        isSell = true
      }

    return (
      <div className={classes.listbox}>
        <Link
          style={{ textDecoration: "none" }}
          to={`/stock/limit-order/${go}/${tmpparams}`}
          state={{ data: stock }}
        >
          <div className={classes.myLimitOrderCard}>
            <div className={classes.rowbox}>
              {isSell ? (
                <div
                  className={classes.label}
                  style={{
                    backgroundColor: "#4D97ED",
                  }}
                >
                  <div
                    style={{ color: "white", fontSize: 10, fontWeight: 700 }}
                  >
                    판매
                  </div>
                </div>
              ) : (
                <div
                  className={classes.label}
                  style={{
                    backgroundColor: "#DD4956",
                  }}
                >
                  <div
                    style={{ color: "white", fontSize: 10, fontWeight: 700 }}
                  >
                    구매
                  </div>
                </div>
              )}
              <div>{stock.name}</div>
            </div>
            <div className={classes.pr}>
              {stock.price.toLocaleString()}원 / {stock.many}주
            </div>
          </div>
          <div className={classes.hrline}></div>
        </Link>
      </div>
    );
  }
  return (
    <div className={classes.limitbg}>
      <div className={classes.fix}>
        <div className={classes.fixbox}>
          <img
              onClick={backToStockList}
              src={`${process.env.PUBLIC_URL}/stock-detail/back.svg`}
              alt=""
            />
        </div>
      </div>
      <div className={classes.limitctn}>

      
        <div>
          <div className={classes.title}>대기중인 주문</div>
          <div className={classes.timereset}>매일 15:30에 리셋</div>
        </div>
        <div className={classes.limitList}>
          {orderList &&
            orderList.map((stock) => (
              <MyRealizedCard
                key={stock.tradeId}
                id={stock.tradeId}
                name={stock.ticker_name}
                ticker={stock.ticker}
                price={stock.tr_price}
                differ={stock.tr_type}
                many={stock.tr_amount}
              />
            ))}
        </div>
      </div>
      

      {/* <div className={classes.info}>
        <img
          className={classes.pd}
          src={`${process.env.PUBLIC_URL}/grayBack.svg`}
          alt=""
          onClick={backToStockList}
        />
        <div>매일 15:30에 리셋</div>
      </div> */}
      {/* <div className={classes.hrline}></div>
      <div className={classes.title}>대기중인 주문</div> */}
    </div>
  );
}

export default LimitOrderPage;
