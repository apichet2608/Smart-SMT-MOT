import React from "react";
import Plot from "react-plotly.js";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const ChartComponent = ({ dataplot, categories }) => {
  const inputData = dataplot;

  const usl = inputData.map((dataPoint) => ({
    x: dataPoint.create_at,
    y: dataPoint.result,
  }));

  const series = ["Status Signal"];
  const chartData = [usl];
  console.log(chartData);

  const latestValues = {};

  series.forEach((seriesName, index) => {
    const seriesData = chartData[index];
    if (seriesData && seriesData.length > 0) {
      // Check if seriesData is not empty
      const lastDataPoint = seriesData[seriesData.length - 1];
      if (lastDataPoint) {
        // Check if lastDataPoint is not undefined
        latestValues[seriesName] = lastDataPoint.y;
      }
    }
  });

  console.log(latestValues);

  // สร้างชิปสำหรับแสดงค่าล่าสุดแต่ละตัว
  const latestValueChips = Object.entries(latestValues).map(([key, value]) => (
    <Chip
      key={key}
      variant="outlined"
      color={value <= 200000 ? "primary" : "error"}
      avatar={
        <Avatar
          style={{
            width: `${
              value.toString().length >= 3
                ? value.toString().length * 8
                : "auto"
            }px`,
            height: "auto",
            borderRadius: `${value.toString().length * 2}px`,
          }}
        >
          {value}
        </Avatar>
      }
      label={key}
    />
  ));

  // สร้างข้อมูลกราฟ
  const data = chartData.map((seriesData, index) => ({
    x: categories,
    y: seriesData.map((dataPoint) => dataPoint.y),
    type: "scattergl",
    mode: "lines",
    name: series[index],
  }));

  console.log(data);

  // เพิ่มเส้น Trace อีก 1 เส้น
  // data.push({
  //   x: categories,
  //   y: Array(categories.length).fill(115),
  //   type: "scattergl",
  //   mode: "lines",
  //   line: {
  //     color: "#FF0000", // เปลี่ยนสีตามต้องการ
  //   },
  //   name: "LSL", // แทนที่ "Another Trace" ด้วยชื่อที่ต้องการ
  // });

  // // เพิ่มเส้น Trace อีก 1 เส้น
  // data.push({
  //   x: categories,
  //   y: Array(categories.length).fill(125),
  //   type: "scattergl",
  //   mode: "lines",
  //   line: {
  //     color: "#FF0000", // เปลี่ยนสีตามต้องการ
  //   },
  //   name: "USL", // แทนที่ "Another Trace" ด้วยชื่อที่ต้องการ
  // });

  // เพิ่มเส้น Trace อีก 1 เส้น
  // data.push({
  //   x: categories,
  //   y: Array(categories.length).fill(120),
  //   type: "scattergl",
  //   mode: "lines",
  //   line: {
  //     color: "#FF0000", // เปลี่ยนสีตามต้องการ
  //   },
  //   name: "Target", // แทนที่ "Another Trace" ด้วยชื่อที่ต้องการ
  // });
  const layout = {
    title: "Reflow Tamura",
    xaxis: {
      tickangle: -45,
      automargin: true,
    },
    yaxis: {
      // title: "oC",
    },
    // width: 1450,
    height: 350,
    autosize: true,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 50,
      pad: 0,
    },
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "right" }}>
        {latestValueChips}
      </div>
      <div>
        <Plot
          data={data}
          layout={layout}
          style={{ width: "100%", height: "100%" }}
          useResizeHandler={true}
        />
      </div>
    </>
  );
};

export default ChartComponent;
