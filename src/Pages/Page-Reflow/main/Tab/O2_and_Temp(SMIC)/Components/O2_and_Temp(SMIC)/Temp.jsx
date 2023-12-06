import React from "react";
import Plot from "react-plotly.js";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const ChartComponent = ({ dataplot, categories }) => {
  // ดึงค่าล่าสุดจาก dataplot
  const latestValues = {
    "1t_pv_degree_c": dataplot[dataplot.length - 1]["1t_pv_degree_c"],
    "1b_pv_degree_c": dataplot[dataplot.length - 1]["1b_pv_degree_c"],
    "2t_pv_degree_c": dataplot[dataplot.length - 1]["2t_pv_degree_c"],
    "2b_pv_degree_c": dataplot[dataplot.length - 1]["2b_pv_degree_c"],
    "3t_pv_degree_c": dataplot[dataplot.length - 1]["3t_pv_degree_c"],
    "3b_pv_degree_c": dataplot[dataplot.length - 1]["3b_pv_degree_c"],
    "4t_pv_degree_c": dataplot[dataplot.length - 1]["4t_pv_degree_c"],
    "4b_pv_degree_c": dataplot[dataplot.length - 1]["4b_pv_degree_c"],
    "5t_pv_degree_c": dataplot[dataplot.length - 1]["5t_pv_degree_c"],
    "5b_pv_degree_c": dataplot[dataplot.length - 1]["5b_pv_degree_c"],
    "6t_pv_degree_c": dataplot[dataplot.length - 1]["6t_pv_degree_c"],
    "6b_pv_degree_c": dataplot[dataplot.length - 1]["6b_pv_degree_c"],
    "7t_pv_degree_c": dataplot[dataplot.length - 1]["7t_pv_degree_c"],
    "7b_pv_degree_c": dataplot[dataplot.length - 1]["7b_pv_degree_c"],
    "8t_pv_degree_c": dataplot[dataplot.length - 1]["8t_pv_degree_c"],
    "8b_pv_degree_c": dataplot[dataplot.length - 1]["8b_pv_degree_c"],
    "9t_pv_degree_c": dataplot[dataplot.length - 1]["9t_pv_degree_c"],
    "9b_pv_degree_c": dataplot[dataplot.length - 1]["9b_pv_degree_c"],
    "10t_pv_degree_c": dataplot[dataplot.length - 1]["10t_pv_degree_c"],
    "10b_pv_degree_c": dataplot[dataplot.length - 1]["10b_pv_degree_c"],
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

  // // เพิ่มเส้น Trace อีก 1 เส้น
  // data.push({
  //   x: categories,
  //   y: Array(categories.length).fill(120),
  //   type: "scattergl",
  //   mode: "lines",
  //   line: {
  //     color: "#17EA06", // เปลี่ยนสีตามต้องการ
  //   },
  //   name: "Target", // แทนที่ "Another Trace" ด้วยชื่อที่ต้องการ
  // });
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
