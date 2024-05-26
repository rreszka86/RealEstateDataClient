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
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };
    return <Line data={chartData} options={options} />;
}

export default LinearChart;