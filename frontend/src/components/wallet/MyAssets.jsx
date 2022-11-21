import { Portfolio } from "../../components/wallet/DounutChart";
import classes from "./MyAssets.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import * as React from "react";
import MyAssetList from "./MyAssetList";
import { useSelector } from "react-redux";


function MyAssets() {
  const accountAssetData = useSelector((state) =>{
    return state.setAccount.accountDetail.accountAsset
  })
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    try{
      setAssetProfit(accountAssetData.totalValuePLRatio.toFixed(1))
    } catch {
      setAssetProfit(0)
      return
    }
  }, [accountAssetData])
  const [assetProfit, setAssetProfit] = useState(0);

  function assetProfitCheck() {
    if (assetProfit < 0) {
      return '#4D97ED'
    } else {
      return '#DD4956'
    }
  }
  const assetProfitColor = assetProfitCheck(assetProfit)
  return (
    <div>
      <div className={classes.assetCard}>
        <div className={classes.present}>
          <div>
            <div style={{ marginBottom: '4px', marginLeft: "1px", fontWeight: '500' }}>계좌 내 자산</div>
            <div className={classes.cntbox}>
              <img src={`${process.env.PUBLIC_URL}/wallet/money.svg`} style={{ marginRight: "8px", width: 20, height: 20 }} alt="" />
              <div  className={classes.basebox}>
                {accountAssetData && <div className={classes.count}>{accountAssetData.asset.toLocaleString()}</div>}
                <div>원</div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '0.5px', fontWeight: '500'}}>수익률</div>
            <div className={classes.rev}
              style={{
                color: assetProfitColor,
              }}
            >
              {assetProfit}%
            </div>
          </div>
        </div>
        <div className={classes.bar}></div>
        <div className={classes.lst}>
          <div className={classes.rowbox}>
            <div className={classes.rowbox}>
              <div>현재 씨앗</div>
              <img src={`${process.env.PUBLIC_URL}/wallet/seeds.svg`} style={{ marginLeft: '3px', width: 12, height: 12 }} alt="" />
            </div>
            {accountAssetData && <div className={classes.detail}>{accountAssetData.cash.toLocaleString()}원</div>}
          </div>
          <div className={classes.rowbox}>
            <div className={classes.rowbox}>
              <div>사용 가능</div>
              <img src={`${process.env.PUBLIC_URL}/wallet/vege.svg`} style={{ marginLeft: '3px', width: 12, height: 12 }} alt="" />
            </div>
            {accountAssetData && <div className={classes.detail}>{accountAssetData.availableCash.toLocaleString()}원</div>}
          </div>
        </div>
      </div>
      <Accordion
        sx={{ width: "100%" }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        disableGutters elevation={0}
        
      >
        <AccordionSummary
          style={{ height: 40}}
          className={classes.acd}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className={classes.rowbox}>
            <img src={`${process.env.PUBLIC_URL}/wallet/files.svg`} style={{ marginRight: '3px', marginLeft: '8px', width: 22, height: 22 }} alt="" />
            <div className={classes.ptfl}>
              보유자산 포트폴리오
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "0 0 10px 10px", padding: "30px", display:"flex", justifyContent:"center"}}>
          <Portfolio />
        </AccordionDetails>
      </Accordion>
      <MyAssetList />
    </div>
  );
}

export default MyAssets;
