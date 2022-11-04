import React, { useState } from "react";
import classes from './LimitOrderPage.module.css'
import { Link, useNavigate } from "react-router-dom";

function LimitOrderPage() {
  const navigate = useNavigate();
  function backToStockList() {
    navigate(`/`);
  }
  const [data, setData] = useState([
    {
      name: "삼성전자",
      code: 300020,
      price: 111600,
      many: 5,
      differ: 1,
    },
    {
      name: "SK하이닉스",
      price: 111600,
      code: 671021,
      many: 5,
      differ: 2,
    },
    {
      name: "LG디스플레이",
      price: 111600,
      code: 582901,
      many: 5,
      differ: 1,
    },
    {
      name: "POSCO홀딩스",
      code: 117239,
      price: 707800,
      many: 5,
      differ: 2,
    },
    {
      name: "하이브",
      code: 200001,
      price: 200000,
      many: 5,
      differ: 1,
    },
    {
      name: "LG에너지솔루션2",
      code: 192833,
      profit: 3.2,
      price: 293778,
      many: 34,
      differ: 1,
    },
    {
      name: "SK하이닉스2",
      code: 111819,
      price: 128270,
      many: 5,
      differ: 2,
    },
    {
      name: "삼성바이오로직스2",
      code: 10000,
      price: 2278,
      many: 56,
      differ: 1,
    },
    {
      name: "POSCO홀딩스2",
      code: 11239,
      price: 707800,
      many: 23,
      differ: 2,
    },
    {
      name: "하이브2",
      code: 200081,
      price: 200000,
      many: 7,
      differ: 2,
    },
  ])
  function MyRealizedCard(stock) {
    var differText = ''
    var go = ''
    function differCheck() {
      if (stock.differ === 1) {
        differText = '판매'
        go = 'sell'
        return "#4D97ED";
      } else {
        differText = '구매'
        go = 'buy'
        return "#DD4956";
      }
    }
    const differLabel = differCheck();
    return (
      <Link style={{textDecoration: 'none'}} to={`/stock/limit-order/${go}`} state={{data: stock}}>
        <div className={classes.myLimitOrderCard}>
          <p>{stock.name}</p>
          <p>
            <span>
              {stock.price}
            </span>
          </p>
          <div
            style={{
              width: 33,
              height: 17,
              borderRadius: 5,
              backgroundColor: differLabel,
            }}
          >
            <p style={{ color: "white", fontSize: 10, fontWeight: 700 }}>
              {differText}
            </p>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/grayBack.svg`}
          alt=""
          onClick={backToStockList}
        />
        <div>매일 15:30에 리셋</div>
      </div>
      {data.map((stock) => (
        <MyRealizedCard 
          key={stock.code}
          name={stock.name}
          price={stock.price}
          differ={stock.differ}
          many={stock.many}
        />
      ))}
    </div>
  );
}

export default LimitOrderPage;