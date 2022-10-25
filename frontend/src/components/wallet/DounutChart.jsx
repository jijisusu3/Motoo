import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React from "react";

import Chart from "chart.js/auto";
import * as helpers from "chart.js/helpers";
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
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const createOptions = {
  plugins: {
    labels: {
      render: (args) => {
        if (args.percentage > 10) {
          return args.percentage + "%";
        }
      },
    },
    legend: {
      display: false,
    },
  },
};

export function Portfolio() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const datas = [12, 19, 3, 5, 2, 3, 2];
  const data = createChartdata(labels, datas);
  return (
    <div style={{ width: "45%" }}>
      <ChartProvider>
        <Doughnut data={data} options={createOptions} />
      </ChartProvider>
    </div>
  );
}
