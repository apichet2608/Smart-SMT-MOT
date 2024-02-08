import React from "react";
import Plot from "react-plotly.js";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const ChartComponent = ({ dataplot, categories }) => {
  const inputData = dataplot;

  const usl = inputData.map((dataPoint) => {
    return { x: dataPoint.create_at, y: "1000" };
  });

  const ucl = inputData.map((dataPoint) => {
    return { x: dataPoint.create_at, y: "900" };
  });

  const lcl = inputData.map((dataPoint) => {
    return { x: dataPoint.create_at, y: "100" };
  });

  // const cool1 = inputData.map((dataPoint) => {
  //   if (dataPoint.zone === "COOL1") {
  //     return { x: dataPoint.create_at, y: dataPoint.o2_con_p_chat };
  //   } else {
  //     return { x: dataPoint.create_at, y: "null" };
  //   }
  // });

  const processZoneData = (zone, property) => {
    return inputData.map((dataPoint) => {
      if (dataPoint.zone === zone) {
        const match = dataPoint[property].match(/(\d+)/);
        const yValue = match ? match[0] : "null";
        return { x: dataPoint.create_at, y: yValue };
      } else {
        return { x: dataPoint.create_at, y: "null" };
      }
    });
  };

  const zone1 = processZoneData("ZONE1", "o2_con_pv");
  const zone2 = processZoneData("ZONE2", "o2_con_pv");
  const zone3 = processZoneData("ZONE3", "o2_con_pv");
  const zone4 = processZoneData("ZONE4", "o2_con_pv");
  const zone5 = processZoneData("ZONE5", "o2_con_pv");
  const zone6 = processZoneData("ZONE6", "o2_con_pv");
  const zone8 = processZoneData("ZONE8", "o2_con_pv");
  const cool1 = processZoneData("COOL1", "o2_con_pv");

  const series = [
    "USL",
    "UCL",
    "LCL",
    "cool1",
    "zone1",
    "zone2",
    "zone3",
    "zone4",
    "zone5",
    "zone6",
    "zone8",
  ];
  const chartData = [
    usl,
    ucl,
    lcl,
    cool1,
    zone1,
    zone2,
    zone3,
    zone4,
    zone5,
    zone6,
    zone8,
  ];
  console.log(chartData);

  // ดึงค่าล่าสุดจาก dataplot
  const latestValues = {};

  series.forEach((seriesName, index) => {
    const seriesData = chartData[index];
    const lastNonNullDataPoint = seriesData.reduce((acc, dataPoint) => {
      if (dataPoint.y !== "null") {
        return dataPoint;
      }
      return acc;
    }, null);
    if (lastNonNullDataPoint) {
      latestValues[seriesName] = lastNonNullDataPoint.y;
    }
  });

  console.log(latestValues);

  // สร้างชิปสำหรับแสดงค่าล่าสุดแต่ละตัว
  const latestValueChips = Object.entries(latestValues).map(([key, value]) => (
    <Chip
      key={key}
      variant="outlined"
      color={
        (value <= 900 && value >= 100) ||
        !["target", "lsl", "usl", "ucl", "lcl"].includes(key)
          ? "primary"
          : "warning"
      }
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
  const data = chartData.map((seriesData, index) => {
    const seriesName = series[index];
    const lineColor =
      seriesName === "UCL" || seriesName === "LCL"
        ? "#F57C00"
        : seriesName === "USL"
        ? "#FF0000"
        : seriesName === "Target"
        ? "#17EA06"
        : "";

    return {
      x: categories,
      y: seriesData.map((dataPoint) => dataPoint.y),
      type: "scattergl",
      mode: "lines",
      name: seriesName,
      line: {
        color: lineColor,
      },
    };
  });

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
    title: "O2 Conc. Cool1,Zone1-6,8",
    xaxis: {
      tickangle: -45,
      automargin: true,
    },
    yaxis: {
      title: "PPM",
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
