import React, { useEffect } from "react";
import Highcharts from "highcharts";

const BarChart = ({ containerId, data1, height }) => {
  useEffect(() => {
    Highcharts.chart(containerId, {
      chart: {
        type: "column",
        width: 220,
        height: height || 190,
        responsive: true,
      },
      title: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "category",
        labels: {
          enabled: true,
          style: {
            color: "#676767",
          }, // Hide y-axis labels
        },
        categories: ["2019", "2020", "2021", "2022", "2023"],
      },
      yAxis: {
        title: {
          text: null,
        },
        labels: {
          enabled: false, // Hide y-axis labels
        },
        gridLineWidth: 0, // Hide y-axis grid
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          pointWidth: 30,
          borderWidth: 0,
          colorByPoint: true,
          colors: ["#303c92"],
          dataLabels: {
            enabled: true,
            format: "{point.y:.1f}%",
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },

      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          data: data1 || [
            {
              name: "2019",
              y: 63.06,
              drilldown: "Chrome",
            },
            {
              name: "2020",
              y: 19.84,
              drilldown: "Safari",
            },
            {
              name: "2021",
              y: 34.18,
              drilldown: "Firefox",
            },
            {
              name: "2022",
              y: 24.12,
              drilldown: "Edge",
            },
            {
              name: "2023",
              y: 20.33,
              drilldown: "Opera",
            },
          ],
        },
      ],
    });
  }, [data1]);
  return <div id={containerId}></div>;
};

export default BarChart;
