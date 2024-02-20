import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

const SingleLineChart = ({ containerId }) => {
    useEffect(() => {
        Highcharts.chart(containerId, {
            chart: {
                type: 'spline',
                width: 300,
                height: 230,
                responsive: true,
                backgroundColor: "rgba(0, 0, 0, 0)"
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
                labels: {
                    style: {
                        color: "#fff"
                    }
                },
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
                            fontWeight: "400",// Custom font size for data labels
                            color: "#fff"
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
                    color: '#578ff0' // Set the desired color for the area portion
                }
            },
            series: [
                {
                    name: 'REV',
                    data: [33.0, 26.4, 23.5, 19.1, 15.0],
                    dashStyle: 'Dash',
                    lineWidth: "2.5",
                    color: "#88b3ff",
                    style: {
                        fontWeight: "bold"
                    }

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

export default SingleLineChart;
