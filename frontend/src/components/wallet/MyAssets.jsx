import { Portfolio } from "../../components/wallet/DounutChart";
import classes from "./MyAssets.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import * as React from "react";
import MyAssetList from "./MyAssetList";




function MyAssets(props) {
  

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [assetProfit, setAssetProfit] = useState(13);

  function assetProfitCheck() {
    if (assetProfit < 0) {
      return '#4D97ED'
    } else {
      return '#DD4956'
    }
  }
  const [yesterdayProfit, setYesterdayProfit] = useState(-30);

  function yesterdayProfitCheck() {
    if (yesterdayProfit < 0) {
      return '#4D97ED'
    } else {
      return '#DD4956'
    }
  }
  const assetProfitColor = assetProfitCheck()
  const yesterdayProfitColor = yesterdayProfitCheck()
  return (
    <div>
      <div className={classes.assetCard}>
        <div className={classes.present}>
          <div>
            <div style={{ marginBottom: '4px', marginLeft: "1px", fontWeight: '500' }}>계좌 내 자산</div>
            <div className={classes.cntbox}>
              <img src={`${process.env.PUBLIC_URL}/wallet/money.svg`} style={{ marginRight: "8px", width: 20, height: 20 }} alt="" />
              <div  className={classes.basebox}>
                <div className={classes.count}>405,219,228</div>
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
            <div className={classes.detail}>140,204,201 원</div>
          </div>
          <div className={classes.rowbox}>
            <div className={classes.rowbox}>
              <div>전일 손익</div>
              <img src={`${process.env.PUBLIC_URL}/wallet/vege.svg`} style={{ marginLeft: '3px', width: 12, height: 12 }} alt="" />
            </div>
            <div className={classes.detail}>- 200,434,000 원</div>
            <div className={classes.persent} style={{ width:33, height:17, borderRadius:5, border:`1px solid ${yesterdayProfitColor}` }}>
              <div style={{color:yesterdayProfitColor, fontSize:10, fontWeight:700 }}>-30%</div>
            </div>
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
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "0 0 10px 10px", padding: "30px"}}>
          <Portfolio />
        </AccordionDetails>
      </Accordion>
      <MyAssetList />
    </div>
  );
}

export default MyAssets;
