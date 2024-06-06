import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement } from "chart.js";

ChartJS.register(BarElement);

const BarChart = ({ chartData }) => {

    const options = {
        plugins: {
            title: {
              display: true,
              text: "Zestawienie cen mieszkań we wszystkich województwach w wybranym roku",
              font: {
                size: 16,
              },
            },
        }
    }

    return <Bar options={options} data={chartData}/>;
};

export default BarChart;