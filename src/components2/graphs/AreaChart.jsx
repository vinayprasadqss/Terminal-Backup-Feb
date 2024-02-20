import React, { useEffect } from 'react'
import Highcharts from "highcharts";
import millify from 'millify'

const AreaChart = ({ containerId, labelcolor, bgcolor, xlabel, data, linecolor, height, width, data1 }) => {
    // console.log(data1)
    useEffect(() => {
        Highcharts.chart(containerId, {
            chart: {
                type: 'area', width: width || "350", height: height || "200",
                backgroundColor: 'rgba(0,0,0,0)'

            },
            title: {
                text: null,
                align: 'left'
            },
            subtitle: {
                text: null,
                align: 'left'
            },
            yAxis: {
                title: {
                    useHTML: true,
                    text: null
                },
                labels: {
                    enabled: false
                },
                gridLineWidth: 0, // Hiding the grid lines
                gridLineColor: 'transparent'
            },
            xAxis: {
                lineColor: "transparent",
                categories: xlabel || ['2019', '2020', '2021', '2022', '2023'],
                labels: {
                    style: {
                        color: labelcolor || '#fff',
                        textOutline: "none"
                    }
                }
            },
            tooltip: {
                shared: true,
                headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                series: {
                    // pointStart: 2019
                },
                area: {
                    stacking: 'normal',
                    lineColor: linecolor || '#77a9ff',
                    lineWidth: 2,
                    dashStyle: "Dash",
                    marker: {
                        lineWidth: 1,
                        lineColor: linecolor || '#77a9ff'
                    },
                    fillColor: bgcolor || "rgba(0, 194, 255, 0.20)",
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '$' + millify(this.y); // Custom formatting for data labels with a $ sign
                        },
                        style: {
                            color: linecolor || "#fff",
                            textOutline: "none",
                            fontWeight: "300"
                        }
                    }
                }
            },
            series: [{
                name: 'Ocean transport',
                data: data1 || [60, 47, 41, 34, 27],
                color: linecolor || "#77a9ff"
            }]
        });

    }, [data1])

    return (
        <div id={containerId}></div>
    )
}

export default AreaChart