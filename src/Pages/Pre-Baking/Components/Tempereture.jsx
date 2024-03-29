import React from "react";
import Plot from "react-plotly.js";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const ChartComponent = ({ dataplot, categories }) => {
  // ดึงค่าล่าสุดจาก dataplot
  const latestValues = {
    temp_pv: dataplot[dataplot.length - 1].temp_pv,
  };

  // สร้างชิปสำหรับแสดงค่าล่าสุดแต่ละตัว
  const latestValueChips = Object.entries(latestValues).map(([key, value]) => (
    <Chip
      key={key}
      variant="outlined"
      color={value <= 125 && value >= 115 ? "primary" : "error"}
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
  const data = Object.entries(latestValues).map(([key, value]) => ({
    x: categories,
    y: dataplot.map((item) => item[key]),
    type: "scattergl",
    mode: "lines",
    // line: {
    //   color: key === "m_c_limit3" ? "#FF0000" : "#0161FF",
    // },
    name: key,
  }));

  // เพิ่มเส้น Trace อีก 1 เส้น
  data.push({
    x: categories,
    y: Array(categories.length).fill(115),
    type: "scattergl",
    mode: "lines",
    line: {
      color: "#FF0000", // เปลี่ยนสีตามต้องการ
      width: 1, // ปรับขนาดเส้นที่ต้องการ
    },
    name: "LSL", // แทนที่ "Another Trace" ด้วยชื่อที่ต้องการ
  });

  // เพิ่มเส้น Trace อีก 1 เส้น
  data.push({
    x: categories,
    y: Array(categories.length).fill(125),
    type: "scattergl",
    mode: "lines",
    line: {
      color: "#FF0000", // เปลี่ยนสีตามต้องการ
      width: 1, // ปรับขนาดเส้นที่ต้องการ
    },
    name: "USL", // แทนที่ "Another Trace" ด้วยชื่อที่ต้องการ
  });

  // เพิ่มเส้น Trace อีก 1 เส้น
  data.push({
    x: categories,
    y: Array(categories.length).fill(120),
    type: "scattergl",
    mode: "lines",
    line: {
      color: "#FF0000", // เปลี่ยนสีตามต้องการ
      width: 1, // ปรับขนาดเส้นที่ต้องการ
    },
    name: "Target", // แทนที่ "Another Trace" ด้วยชื่อที่ต้องการ
  });
  const layout = {
    title: "Tempereture",
    xaxis: {
      tickangle: -45,
      automargin: true,
    },
    yaxis: {
      title: "oC",
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
