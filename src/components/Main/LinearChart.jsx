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
function LinearChart({ chartData, optionsSet }) {
  

  const handleOptions = () => {
    if(optionsSet == "linearChart") return linearOptions;
    else if(optionsSet == "percentageChart") return percentageOptions;
  }

  const linearOptions = {
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
      legend: {
        display: true,
        labels:{
          filter: function(legendItem, data){
            return !data.datasets[legendItem.datasetIndex].hidden;
          }
        }
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
        }
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

  const percentageOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Zestawienie zmian procentowych cen mieszkań oraz wartości stóp procentowych z ostatnich 10 lat",
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        labels:{
          filter: function(legendItem, data){
            return !data.datasets[legendItem.datasetIndex].hidden;
          }
        }
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
        beginAtZero: true,
        title: {
          display: true,
          text: "Wzrost procentowy cen mieszkań wyrażony w (%)",
          font: {
            size: 16,
          },
        }
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
  
  return <Line data={chartData} options={handleOptions()} />;
}

export default LinearChart;
