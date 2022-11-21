import React, { useState, useEffect } from "react";
import classes from "./MyAssetList.module.css";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MyAssetList() {
  const [value, setValue] = useState("1");
  const accountAssetData = useSelector((state) => {
    return state.setAccount.accountDetail.accountAsset;
  });

  const [data, setData] = useState([
    {
      priceHigh: [],
    },
    {
      profitHigh: [],
    },
  ]);
  useEffect(() => {
    try {
      setExample(accountAssetData.stockOrderByTotalValue);
      data[0]["priceHigh"] = accountAssetData.stockOrderByTotalValue;
      data[1]["profitHigh"] = accountAssetData.stockOrderByValuePLRatio;
    } catch (err) {
      return;
    }
  }, [accountAssetData]);

  const navigate = useNavigate();
  function goToDetail(ticker) {
    if (Boolean(ticker)) {
      navigate(`/stock/detail/${ticker}`);
    }
  };

  function setDropdownData(value) {
    if (value === "1") {
      setExample(data[0]["priceHigh"]);
    } else {
      setExample(data[1]["profitHigh"]);
    }
  }
  const handleValueChange = (event) => {
    setValue(event.target.value);
    setDropdownData(event.target.value);
  };

  const [example, setExample] = useState(data[0]["priceHigh"]);
  function MyStockCard(stock) {
    function profitCheck() {
      if (stock.profit < 0) {
        return "#4D97ED";
      } else {
        return "#DD4956";
      }
    }
    const profitColor = profitCheck();
    return (
      <div onClick={()=>goToDetail(stock.code)} className={classes.myStockCard}>
        <div className={classes.abovebox}>
          <div className={classes.stname}>{stock.name}</div>
          <div>
            <div className={classes.rowbox}>
              <div className={classes.rowbox}>
                <img
                  src={`${process.env.PUBLIC_URL}/wallet/coin.svg`}
                  style={{ width: 12, height: 12 }}
                  alt=""
                />
                <div className={classes.result}>평가손익</div>
              </div>
              <div className={classes.section} style={{ color: profitColor }}>
                {stock?.profit ? stock.profit.toLocaleString() : 0}
              </div>
            </div>
            <div className={classes.rowbox} style={{ marginTop: "4px" }}>
              <div className={classes.rowbox}>
                <img
                  src={`${process.env.PUBLIC_URL}/wallet/chart.svg`}
                  style={{ width: 12, height: 12 }}
                  alt=""
                />
                <div className={classes.result}>수익률</div>
              </div>
              <div className={classes.section} style={{ color: profitColor }}>
                {stock.percent.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
        <div className={classes.belowbox}>
          <div className={classes.infobox}>
            평균구매가
            <div className={classes.numbox}>
              <p className={classes.txts}>{stock.mean}</p>원
            </div>
          </div>
          <div className={classes.infobox}>
            현재가
            <div className={classes.numbox}>
              <p className={classes.txts}>{stock.now}</p>원
            </div>
          </div>
          <div className={classes.infobox}>
            수량
            <div className={classes.numbox}>
              <p className={classes.txts}>{stock.many}</p>주
            </div>
          </div>
          <div className={classes.infobox}>
            평가금액
            <div className={classes.numbox}>
              <p className={classes.txts}>{stock.all}</p>원
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <FormControl
        sx={{ m: 1, minWidth: 120, marginTop: "30px", marginBottom: "15px" }}
        size="small"
        focused={0}
      >
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={value}
          onChange={handleValueChange}
          sx={{
            boxShadow: "none",
            border: 0,
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
        >
          <MenuItem value={"1"}>
            <Typography
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#474747"}
              fontFamily="Pretendard"
            >
              보유가격순
            </Typography>
          </MenuItem>
          <MenuItem value={"2"}>
            <Typography
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#474747"}
              fontFamily="Pretendard"
            >
              수익률높은순
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>
      <div className={classes.listbox}>
        {example &&
          example.map((stock) => (
            <MyStockCard
              key={stock.ticker}
              code={stock.ticker}
              name={stock.stockName}
              profit={stock.valuePL}
              percent={stock.valuePLRatio}
              mean={stock.avgPrice}
              now={stock.price}
              many={stock.amount}
              all={stock.totalValue}
            />
          ))}
      </div>
    </>
  );
}
export default MyAssetList;
