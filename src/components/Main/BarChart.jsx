import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement} from "chart.js";

ChartJS.register(BarElement);

const BarChart = ({ chartData, optionsSet }) => {

    const handleOptionSet = () => {
      if(optionsSet == "barChart") return optionsBar
      else if(optionsSet == "barChartType") return optionsBarType
    }

    const optionsBar = {
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

    const optionsBarType = {
      plugins: {
          title: {
            display: true,
            text: "Zestawienie średnich cen mieszkań ze wszystkich lat w wybranym województwie w (zł)",
            font: {
              size: 16,
            },
          },
      }
  }

    return <Bar options={handleOptionSet()} data={chartData}/>;
};

export default BarChart;