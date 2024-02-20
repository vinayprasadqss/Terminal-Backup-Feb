import React, { useEffect } from "react";
import Highcharts from "highcharts";
import millify from "millify";

const MultiLineGraph = ({
    containerId,
    labelcolor,
    xlabel,
    datasets,
    height,
    width,
}) => {
    useEffect(() => {
        Highcharts.chart(containerId, {
            chart: {
                type: "line", // Change type to "line"
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
                    style: {
                        color: labelcolor || "#000",
                        textOutline: "none",
                    },
                },
            },
            xAxis: {
                categories: xlabel || ["2019", "2020", "2021", "2022", "2023"],
            },
            tooltip: {
                shared: true,
                headerFormat:
                    '<span style="font-size:12px"><b>{point.key}</b></span><br>',
            },
            legend: {
                enabled: true,
            },
            plotOptions: {
                line: {
                    lineWidth: 2,
                    marker: {
                        radius: 4,
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return "$" + millify(Number(this.y));
                        },
                        style: {
                            color: "#000",
                            textOutline: "none",
                            fontWeight: "300",
                        },
                    },
                },
            },
            series: datasets.map((dataset, index) => ({
                name: dataset.name || `Dataset ${index + 1}`,
                data: [...dataset.data?.map((d) => Number(d))] || [60, 47, 41, 34, 27],
                color: dataset.lineColor || "#447dde",
            })),
        });
    }, [datasets]);

    return <div id={containerId}></div>;
};

export default MultiLineGraph;
