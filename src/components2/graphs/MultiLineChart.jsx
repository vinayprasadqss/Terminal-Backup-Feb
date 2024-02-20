import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

const MultiLineChart = ({ containerId }) => {
    useEffect(() => {
        Highcharts.chart(containerId, {
            chart: {
                type: 'spline',
                width: 400,
                height: 230,
                responsive: true,
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            yAxis: {
                title: {
                    text: null,
                },
                labels: {
                    enabled: false,
                },
                gridLineWidth: 0,
            },
            xAxis: {
                categories: ['2019', '2020', '2021', '2022', '2023'],
                accessibility: {
                    rangeDescription: 'Range: 2019 to 2023',
                },
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                    dataLabels: {
                        enabled: true,
                        color: "#578ff0",
                        borderWidth: 0,
                        border: 'none', // Border color for data labels
                        style: {
                            fontSize: '12px',
                            textOutline: "none",
                            fontWeight: "400"// Custom font size for data labels
                        },
                        formatter: function () {
                            return "$" + this.y + "M";
                        },

                    },
                },

                spline: {
                    marker: {
                        enabled: true,
                        radius: 3,
                    },
                },
                area: {
                    color: 'rgba(0, 0, 0, 0.9)',

                },
            },
            series: [
                {
                    name: 'REV',
                    data: [33.0, 26.4, 23.5, 19.1, 15.0],
                    dashStyle: 'Dot',
                    color: "#303c92",

                },
                {
                    name: 'Cor',
                    data: [27, 21, 18, 15, 12],
                    color: "#78aaff"
                },
                {
                    name: 'GP',
                    data: [60, 47, 41, 34, 27],
                    color: "#0a1985",

                },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 800,
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom',
                            },
                        },
                    },
                ],
            },
        });
    }, []);
    return <div id={containerId}></div>;
};

export default MultiLineChart;
