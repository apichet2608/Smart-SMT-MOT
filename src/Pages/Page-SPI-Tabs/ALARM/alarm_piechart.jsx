import React from "react";
import Chart from "react-apexcharts";

function ApexPieChart({ series, labels }) {
  const chartOptions = {
    chart: {
      type: "pie",
    },
    //สีสดใสที่ไม่ซ้ำกันเลย 14 สี
    colors: [
      "#D4526E",
      "#8D5B4C",
      "#F86624",
      "#D7263D",
      "#1B998B",
      "#2E294E",
      "#F46036",
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#3F51B5",
      "#546E7A",
    ],
    labels: labels,
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
        },
      },
    ],
  };

  return (
    <Chart options={chartOptions} series={series} type="pie" width="580" />
  );
}

export default ApexPieChart;
