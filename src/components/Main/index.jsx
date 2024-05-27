import { useState, useEffect } from "react";
import LinearChart from "./LinearChart";
import Menu from "./ChartNav";
import dataService from "../../services/dataService";
import "./LinearChart.css";

function Main() {
  const [housingData, setHousingData] = useState([]);
  const [ratesData, setRatesData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [isLoadingHousing, setIsLoadingHousing] = useState(true);
  const [isLoadingInterests, setIsLoadingInterests] = useState(true);
  const [region, setRegion] = useState("POLSKA");
  const [market, setMarket] = useState("rynek pierwotny");
  const [type, setType] = useState("do 40 m2");

  useEffect(() => {
    dataService.getHousingData(region, market, type).then((data) => {
      setHousingData(data);
      setIsLoadingHousing(false);
    });
  }, [region, market, type]);

  useEffect(() => {
    dataService.getRatesData().then((data) => {
      setRatesData(data);
      setIsLoadingInterests(false);
    });
  }, [isLoadingInterests]);

  const mergeDates = (dates1, dates2) => {
    const uniqueDates = new Set([...dates1, ...dates2]);
    return Array.from(uniqueDates).sort((a, b) => new Date(a) - new Date(b));
  };

  const mapDataToDates = (
    dates,
    dataDates,
    dataValues,
    flagFullYears = false
  ) => {
    const dataMap = new Map(
      dataDates.map((date, index) => [date, dataValues[index]])
    );
    let lastValue = null;
    return dates.map((date) => {
      if (dataMap.has(date)) {
        lastValue = dataMap.get(date);
        return { value: lastValue, isFullYear: flagFullYears };
      }
      return { value: lastValue, isFullYear: false };
    });
  };

  useEffect(() => {
    if (!isLoadingHousing && !isLoadingInterests) {
      const housingDates = housingData.map((d) => `${d.year}-01-01`);
      const housingPrices = housingData.map((d) => d.price);
      const interestRateDates = ratesData.map((d) => {
        const [day, month, year] = d.date.split("-");
        return `${day}-${month}-${year}`;
      });
      const interestRates = ratesData.map((d) => d.refRate);

      const allDates = mergeDates(housingDates, interestRateDates);
      const mappedHousingPrices = mapDataToDates(
        allDates,
        housingDates,
        housingPrices,
        true
      );
      const mappedInterestRates = mapDataToDates(
        allDates,
        interestRateDates,
        interestRates
      );

      const parsedData = {
        labels: allDates,
        datasets: [
          {
            label: "Ceny mieszkań",
            data: mappedHousingPrices.map((d) =>
              d.isFullYear ? d.value : null
            ),
            borderDash: [5, 5],
            yAxisID: "y",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Stopy procentowe",
            data: mappedInterestRates.map((d) => d.value),
            stepped: true,
            yAxisID: "y1",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            pointRadius: 0,
          },
        ],
      };
      parsedData.labels.pop();
      parsedData.datasets[0].data.pop();
      setChartData(parsedData);
    }
  }, [isLoadingHousing, isLoadingInterests, housingData, ratesData]);



  return (
    <div>
      <Menu
        region={region}
        setRegion={setRegion}
        market={market}
        setMarket={setMarket}
        type={type}
        setType={setType}
        data={housingData}
      ></Menu>
      <div className="chartCard">
        <div className="chartBox">
          {chartData ? <LinearChart chartData={chartData} /> : <p></p>}
        </div>
      </div>
    </div>
  );
}

export default Main;
