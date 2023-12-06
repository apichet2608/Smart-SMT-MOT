import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const LineChartHumid = ({ data, titles }) => {
  const [traceData, setTraceData] = useState([]);
  const [layout, setLayout] = useState({
    autosize: true,
    xaxis: {
      // title: "Humid_pv",
      // title: "Create_at",
      type: "category",
      tickangle: -45,
      automargin: true,
    },
    yaxis: {
      title: "%RH",
    },
    title: titles,
    // width: 1500,
    height: 400,
    showlegend: true,
    legend: {
      x: 1,
      y: 1,
    },
    margin: {
      l: 25,
      r: 30,
      b: 50,
      t: 50,
      pad: 4,
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const trace1 = {
        type: "scattergl",
        mode: "lines",
        // name: "Humid_pv",
        x: data.map((item) => item.create_at),
        y: data.map((item) => item.humid_pv),
        text: data.map((item) => item.humid_pv),
        line: {
          color: "#368BC1",
        },
      };

      const humidLine60 = {
        type: "scattergl",
        mode: "lines",
        name: "USL = 60",
        x: data.map((item) => item.create_at),
        y: Array(data.length).fill(60),
        line: {
          color: "red",
        },
      };

      const humidLine50 = {
        type: "scattergl",
        mode: "lines",
        name: "Target",
        x: data.map((item) => item.create_at),
        y: Array(data.length).fill(50),
        line: {
          color: "#2ECC71",
        },
      };

      const humidLine40 = {
        type: "scattergl",
        mode: "lines",
        name: "LSL = 40",
        x: data.map((item) => item.create_at),
        y: Array(data.length).fill(40),
        line: {
          color: "red",
        },
      };

      setTraceData([trace1, humidLine40, humidLine60, humidLine50]);

      // Update layout
      setLayout((prevLayout) => ({
        ...prevLayout,
        title: titles,
      }));
    }
  }, [data, titles]);

  if (traceData.length === 0) {
    return <>NO DATA</>;
  }

  return (
    <Plot
      data={traceData}
      layout={layout}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler={true}
    />
  );
};

export default LineChartHumid;
