import React from "react";
import Chart from "react-apexcharts";

export default function StackChart({
  category,
  pickupErrPpmSeries,
  recogErrPpmSeries,
}) {
  // Format datetime to yyyy-mm-dd hh:mm:ss for Category or X-axis
  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const categoryFormatted = category.map((datetime) =>
    formatDateTime(datetime)
  );

  console.log("categoryFormatted: ", categoryFormatted);

  const options = {
    chart: {
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    xaxis: {
      categories: categoryFormatted,
      labels: {
        rotate: -60, // Rotate labels by -45 degrees
        rotateAlways: true, // Stagger labels automatically to prevent overlap
        style: {
          fontSize: "12px", // Decrease font size
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + " PPM"; // Append "PPM" to y-axis labels
        },
      },
    },
    series: [
      {
        name: "Pickup Error PPM",
        data: pickupErrPpmSeries,
      },
      {
        name: "Recognition Error PPM",
        data: recogErrPpmSeries,
      },
    ],
    annotations: {
      yaxis: [
        {
          y: 1000,
          borderColor: "#FF4560",
          label: {
            borderColor: "#FF4560",

            style: {
              color: "#fff",
              background: "#FF4560",
            },
            text: "1000 PPM",
          },
        },
      ],
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={400}
        width={"100%"}
      />
    </div>
  );
}
