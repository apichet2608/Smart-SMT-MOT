import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const LineChartTemp = ({ data, titles }) => {
  const [traceData, setTraceData] = useState([]);
  const [layout, setLayout] = useState({
    autosize: true,
    xaxis: {
      // title: "Temp_pv",
      // title: "Create_at",
      type: "category",
      tickangle: -45,
      automargin: true,
    },
    yaxis: {
      title: "Temp(ºC)",
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
        name: "Temp_pv",
        x: data.map((item) => item.create_at),
        y: data.map((item) => item.temp_pv),
        text: data.map((item) => item.temp_pv),
        line: {
          color: "#1589FF",
        },
      };

      const horizontalLine28 = {
        type: "scattergl",
        mode: "lines",
        name: "USL = 28",
        x: data.map((item) => item.create_at),
        y: Array(data.length).fill(28),
        line: {
          color: "red",
        },
      };

      const horizontalLine25 = {
        type: "scattergl",
        mode: "lines",
        name: "Target",
        x: data.map((item) => item.create_at),
        y: Array(data.length).fill(25),
        line: {
          color: "#2ECC71",
        },
      };

      const horizontalLine22 = {
        type: "scattergl",
        mode: "lines",
        name: "LSL = 22",
        x: data.map((item) => item.create_at),
        y: Array(data.length).fill(22),
        line: {
          color: "red",
        },
      };

      setTraceData([
        trace1,
        horizontalLine28,
        horizontalLine22,
        horizontalLine25,
      ]);

      // Update layout
      setLayout((prevLayout) => ({
        ...prevLayout,
        title: titles,
      }));
    }
  }, [data, titles]);

  return (
    <Plot
      data={traceData}
      layout={layout}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler={true}
    />
  );
};

export default LineChartTemp;
