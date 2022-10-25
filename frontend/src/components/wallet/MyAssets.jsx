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
        <span>계좌 내 자산</span>
        <span>수익률</span>
        <span>405,219,228 원</span>
        <p
          style={{
            color: assetProfitColor,
          }}
        >
          {assetProfit}%
        </p>
        <span>현재 씨앗</span>
        <span>140,204,201원</span>
        <p>전일 손익</p>
        <span>- 200,434,000 원</span>
        <div style={{ width:33, height:17, borderRadius:5, border:`1px solid ${yesterdayProfitColor}` }}>
          <p style={{color:yesterdayProfitColor, fontSize:10, fontWeight:700 }}>-30%</p>
        </div>
        
      </div>
      <Accordion
        sx={{ width: "100%" }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <p
            sx={{ width: "100%", flexShrink: 0 }}
            style={{ fontSize: "4vw", fontWeight: 600 }}
          >
            보유자산 포트폴리오
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <Portfolio />
        </AccordionDetails>
      </Accordion>
      <MyAssetList />
    </div>
  );
}

export default MyAssets;
