import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);
function LinearChart({ chartData }) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Zestawienie cen mieszkań oraz stóp procentowych z ostatnich 10 lat",
        font: {
          size: 16,
        },
      },
      tooltip: {
        position: "nearest",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
          tooltipFormat: "MMM yyyy",
          displayFormats: {
            month: "MMM yyyy",
          },
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Średnia cena mieszkania w (zł)",
          font: {
            size: 16,
          },
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Wartość stóp procentowych wyrażona w (%)",
          font: {
            size: 16,
          },
        },
      },
    },
    spanGaps: true,
  };
  return <Line data={chartData} options={options} />;
}

export default LinearChart;
