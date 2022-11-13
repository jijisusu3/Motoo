import React, { useState, useEffect } from "react";
import classes from "./LimitOrderPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav } from "../../stores/navSlice";
import { limitListGet } from "../../stores/stockSlice";

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
  console.log(orderList);
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
  }, []);

  function backToStockList() {
    navigate(`/`);
  }
  function MyRealizedCard(stock) {
    const tmpparams = stock.ticker + ":" + stock.price + ":" + stock.many + ":" + stock.id
    console.log(tmpparams)
    var differText = "";
    var go = "";
    function differCheck() {
      if (stock.differ === 4) {
        differText = "판매";
        go = "sell";
        return "#4D97ED";
      } else {
        differText = "구매";
        go = "buy";
        return "#DD4956";
      }
    }
    const differLabel = differCheck();
    return (
      <div className={classes.listbox}>
        <Link
          style={{ textDecoration: "none" }}
          to={`/stock/limit-order/${go}/${tmpparams}`}
          state={{ data: stock }}
        >
          <div className={classes.myLimitOrderCard}>
            <div className={classes.rowbox}>
              <div
                className={classes.label}
                style={{
                  backgroundColor: differLabel,
                }}
              >
                <div style={{ color: "white", fontSize: 10, fontWeight: 700 }}>
                  {differText}
                </div>
              </div>
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
    <div>
      <div className={classes.info}>
        <img
          className={classes.pd}
          src={`${process.env.PUBLIC_URL}/grayBack.svg`}
          alt=""
          onClick={backToStockList}
        />
        <div>매일 15:30에 리셋</div>
      </div>
      <div className={classes.hrline}></div>
      <div className={classes.title}>대기중인 주문</div>
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
  );
}

export default LimitOrderPage;
