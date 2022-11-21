import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useEffect } from "react";

import Chart from "chart.js/auto";
import * as helpers from "chart.js/helpers";
import { useSelector } from "react-redux";
import classes from "./DounutChart.module.css";
// import React, { useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

function ChartProvider({children}) {
  React.useEffect(() => {
    window.Chart = Chart;
    Chart.helpers = helpers;
    import('chart.js-plugin-labels-dv');
  }, []);
  return children;
}
export const createChartdata = (labelList, dataList) => {
  return {
    labels: labelList,
    datasets: [
      {
        label: "# of Votes",
        data: dataList,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

export function Portfolio() {
  const portfolioData = useSelector((state) =>{
    return state.setAccount.accountDetail.portfolioList
  })
  const labels = [];
  const datas = [];
  if(portfolioData){
    portfolioData.forEach(element => {
      labels.push(element["itemName"])
      datas.push(element["ratio"].toFixed(1))
    })
  }
  const backgroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ]
  const data = createChartdata(labels, datas);
  const createOptions = {
    plugins: {
      labels: {
        render: (args) => {
          if (args.value > 10) {
            return args.value + "%";
          }
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={classes.portFolioChart}>
      <div style={{ width: 144 }}>
        <ChartProvider>
          <Doughnut data={data} options={createOptions} />
        </ChartProvider>
      </div>
      <div className={classes.chartLabel}>
        {labels && labels.map((label, index) => (
          <div key={index} >
            <div className={classes.chartLabelOne} style={{width:12, height:12, borderRadius:50, backgroundColor: backgroundColor[index]}}></div>
            <div className={classes.chartLabelText}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
