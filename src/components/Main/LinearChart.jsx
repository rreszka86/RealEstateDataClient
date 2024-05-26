import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LinearChart({ chartData }) {
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Zestawienie cen mieszkań oraz stóp procentowych z ostatnich 10 lat',
                font:{
                    size: 16
                }
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Średnia cena mieszkania w (zł)',
                    font: {
                        size: 16,
                    }
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: 'Wartość stóp procentowych wyrażona w (%)',
                    font: {
                        size: 16
                    }
                }
            },
        },
    };
    return <Line data={chartData} options={options} />;
}

export default LinearChart;