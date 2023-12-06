import React from "react";
import Plot from "react-plotly.js";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const ChartComponent = ({ dataplot, categories }) => {
  // ดึงค่าล่าสุดจาก dataplot
  const latestValues = {
    t1_pv: dataplot[dataplot.length - 1].t1_pv,
    b1_pv: dataplot[dataplot.length - 1].b1_pv,
    t2_pv: dataplot[dataplot.length - 1].t2_pv,
    b2_pv: dataplot[dataplot.length - 1].b2_pv,
    t3_pv: dataplot[dataplot.length - 1].t3_pv,
    b3_pv: dataplot[dataplot.length - 1].b3_pv,
    t4_pv: dataplot[dataplot.length - 1].t4_pv,
    b4_pv: dataplot[dataplot.length - 1].b4_pv,
    t5_pv: dataplot[dataplot.length - 1].t5_pv,
    b5_pv: dataplot[dataplot.length - 1].b5_pv,
    t6_pv: dataplot[dataplot.length - 1].t6_pv,
    b6_pv: dataplot[dataplot.length - 1].b6_pv,
    t7_pv: dataplot[dataplot.length - 1].t7_pv,
    b7_pv: dataplot[dataplot.length - 1].b7_pv,
    t8_pv: dataplot[dataplot.length - 1].t8_pv,
    b8_pv: dataplot[dataplot.length - 1].b8_pv,
  };

  // สร้างชิปสำหรับแสดงค่าล่าสุดแต่ละตัว
  const latestValueChips = Object.entries(latestValues).map(([key, value]) => (
    <Chip
      key={key}
      variant="outlined"
      color={value <= 125 && value >= 115 ? "primary" : "warning"}
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
      color: "#17EA06", // เปลี่ยนสีตามต้องการ
    },
    name: "Target", // แทนที่ "Another Trace" ด้วยชื่อที่ต้องการ
  });
  const layout = {
    title: "Temp",
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
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "right" }}
      >
        {latestValueChips
          .reduce((rows, chip, index) => {
            if (index % 8 === 0) {
              rows.push([]);
            }
            rows[rows.length - 1].push(chip);
            return rows;
          }, [])
          .map((row, index) => (
            <div key={index} style={{ display: "flex" }}>
              {row}
            </div>
          ))}
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
