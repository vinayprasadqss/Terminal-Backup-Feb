import React, { useEffect } from "react";
import Highcharts from "highcharts";
import millify from "millify";

const VSGraph = ({ containerId, height, data1, data2 }) => {
  useEffect(() => {
    const options = {
      chart: {
        responsive: true,
        backgroundColor: "rgba(0, 0, 0, 0)",
        height: height || 230,
      },
      title: {
        text: null,
      },
      xAxis: {
        categories: [2019, 2020, 2021, 2022, 2023],
      },
      yAxis: [
        {
          title: {
            text: "Employment",
            style: {
              color: "#303c92",
              fontWeight: "500",
            },
          },

          gridLineDashStyle: "dot",
        },
        {
          title: {
            text: "Revenue",
            style: {
              color: "#4d8eff",
              fontWeight: 500,
            },
          },
          opposite: true,
        },
      ],
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            inside: true,
            style: {
              fontWeight: "400",
              textOutline: "none",
            },
            verticalAlign: "bottom",
            y: 0,
          },
          formatter: function () {
            return "$" + millify(this.y); // Custom formatting for data labels with a $ sign
          },
        },
        line: {
          dataLabels: {
            enabled: true,
            style: {
              textOutline: "none",
              color: "#4d8eff",
              fontWeight: "400",
            },
            formatter: function () {
              return "$" + millify(this.y); // Custom formatting for data labels with a $ sign
            },
          },
        },
      },
      series: [
        {
          type: "column",
          name: "Employment",
          data: data1 || [277, 290, 218, 216, 134],
          color: "#303c92",
        },
        {
          type: "line",
          name: "Revenue",
          data: data2 || [60, 48, 42, 34, 27],
          yAxis: 1,
          color: "#4d8eff",
          dashStyle: "Dash",
          lineWidth: "2.5",
        },
      ],
    };

    // Create the chart
    Highcharts.chart(containerId, options);
  }, [data1, data2]);
  return <div id={containerId} />;
};

export default VSGraph;
