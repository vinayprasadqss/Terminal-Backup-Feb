import React, { useEffect } from "react";
import Highcharts from "highcharts";
import millify from "millify";

const FSMLineAreaGraph = ({
    containerId,
    labelcolor,
    bgcolor,
    xlabel,
    data,
    linecolor,
    height,
    width,
    data1,
    data2,
    data3,
}) => {
    // console.log(data1, data2);
    useEffect(() => {
        Highcharts.chart(containerId, {
            chart: {
                type: "area",
                width: width || "350",
                height: height || "200",
                backgroundColor: "rgba(0,0,0,0)",
            },
            title: {
                text: null,
                align: "left",
            },
            subtitle: {
                text: null,
                align: "left",
            },
            yAxis: {
                title: {
                    useHTML: true,
                    text: null,
                },
                labels: {
                    enabled: false,
                },
                gridLineWidth: 0, // Hiding the grid lines
                gridLineColor: "transparent",
            },
            xAxis: {
                lineColor: "transparent",
                categories: xlabel || ["2019", "2020", "2021", "2022", "2023"],
                labels: {
                    style: {
                        color: labelcolor || "#000",
                        textOutline: "none",
                    },
                },
            },
            tooltip: {
                shared: true,
                headerFormat:
                    '<span style="font-size:12px"><b>{point.key}</b></span><br>',
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                series: {
                    // pointStart: 2019
                },
                area: {
                    stacking: "normal",
                    lineColor: linecolor || "#77a9ff",
                    lineWidth: 2,
                    dashStyle: "Dash",
                    marker: {
                        lineWidth: 1,
                        lineColor: linecolor || "#77a9ff",
                    },
                    fillColor: bgcolor || "rgba(0, 194, 255, 0.20)",
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return "$" + millify(Number(this.y)); // Custom formatting for data labels with a $ sign
                        },
                        style: {
                            color: "#000",
                            textOutline: "none",
                            fontWeight: "300",
                        },
                    },
                },
            },
            series: [
                {
                    name: "Revenue",
                    data: data1 || [60, 47, 41, 34, 27],
                    color: linecolor || "#447dde",
                    fillColor: "#447cdeb9",
                },
                {
                    name: "Headcount",
                    data: data2 || [30, 37, 48, 54, 27],
                    color: linecolor || "#3e82f8",
                    fillColor: "rgb(61, 73, 161)",
                },
                {
                    name: "Ebita",
                    data: data3 || [26, 38, 46, 38, 10],
                    color: linecolor || "#4063a0e9",
                    fillColor: "#5a6dff",
                },
            ],
        });
    }, [data1, data2, data3]);

    return <div id={containerId}></div>;
};

export default FSMLineAreaGraph;
