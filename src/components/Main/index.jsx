import { useState, useEffect } from "react";
import LinearChart from "./LinearChart";
import BarChart from "./BarChart";
import Menu from "./ChartNav";
import dataService from "../../services/dataService";
import "./LinearChart.css";

function Main() {
  const [housingData, setHousingData] = useState([]);
  const [secondaryHousingData, setSecondaryHousingData] = useState([]);
  const [ratesData, setRatesData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [barChartDataType, setBarChartDataType] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [barChart, setBarChart] = useState(null);
  const [barChartType, setBarChartType] = useState(null);
  const [isLoadingHousing, setIsLoadingHousing] = useState(true);
  const [isLoadingSecondaryHousing, setIsLoadingSecondaryHousing] = useState(true);
  const [isLoadingInterests, setIsLoadingInterests] = useState(true);
  const [isLoadingBarChartData, setIsLoadingBarChartData] = useState(true);
  const [isLoadingBarChartDataType, setIsLoadingBarChartDataType] = useState(true);
  const [year, setYear] = useState(2013);
  const [region, setRegion] = useState("POLSKA");
  const [market, setMarket] = useState("rynek pierwotny");
  const [type, setType] = useState("do 40 m2");
  const [pickedOption, setPickedOption] = useState("linearChart");

  useEffect(() => {
    if(market == "oba rynki"){
      dataService.getHousingData(region, "rynek pierwotny", type).then((data) => {
        setHousingData(data);
        setIsLoadingHousing(false);
      });
      dataService.getHousingData(region, "rynek wtórny", type).then((data) => {
        setSecondaryHousingData(data);
        setIsLoadingSecondaryHousing(false);
      });
    } else {
    dataService.getHousingData(region, market, type).then((data) => {
      setHousingData(data);
      setSecondaryHousingData([]);
      setIsLoadingHousing(false);
    });
  }
  }, [region, market, type]);

  useEffect(() => {
      dataService.getHousingDataForBarChart(year, type).then((data) => {
        setBarChartData(data);
        setIsLoadingBarChartData(false);
      });
  }, [year, type]);

  useEffect(() => {
      dataService.getHousingDataForTypeBarChart(region, market).then((data) => {
        setBarChartDataType(data)
        setIsLoadingBarChartDataType(false)
      })
  }, [region, market])

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

  const parseData = (
    labels,
    firstLabel,
    secondLabel,
    firstData,
    secondData,
    thirdData,
    isBothPicked
  ) => {
    const parsedData = {
      labels: labels,
      datasets: [
        {
          label: firstLabel,
          data: firstData.map((d) => (d.isFullYear ? d.value : null)),
          borderDash: [5, 5],
          yAxisID: "y",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: secondLabel,
          hidden: !isBothPicked,
          data: secondData.map((d) =>
            d.isFullYear ? d.value : null
          ),
          borderDash: [5, 5],
          yAxisID: "y",
          backgroundColor: "rgba(143, 80, 255, 0.2)",
          borderColor: "rgba(143, 80, 255, 1)",
          borderWidth: 1,
        },
        {
          label: "Stopy procentowe",
          data: thirdData.map((d) => d.value),
          stepped: true,
          yAxisID: "y1",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          pointRadius: 0,
        },
      ],
    };
    return parsedData
  };

  const parseBarData = (labels, primaryData, afterData) => {
    return {
      labels: labels,
      datasets:
      [
        {
          label: "Średnie ceny mieszkań w (zł) - rynek pierwotny",
          data: primaryData,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 0.2)',
        },
        {
          label: "Średnie ceny mieszkań w (zł) - rynek wtórny",
          data: afterData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        }
      ]
    }
  }

  const parseBarDataType = (labels, lowData, midData, higherData, highestData) => {
    return {
      labels: labels,
      datasets:
      [
        {
          label: "do 40 m2",
          data: lowData,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 0.2)',
        },
        {
          label: "od 40,1 do 60 m2",
          data: midData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: "od 60,1 do 80 m2",
          data: higherData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: "od 80,1 m2",
          data: highestData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
        }
      ]
    }
  }

  const calculatePercentageChange = (data) =>{
    return data.map((current, index, array) => {
    if (index === 0) return null;

    const previous = array[index - 1];
    const change = ((current.price - previous.price) / previous.price) * 100;
    return change.toFixed(2);
  });
}

useEffect(() => {
  if (!isLoadingHousing && !isLoadingInterests && pickedOption !== "barChart") {
    const housingDates = housingData.map((d) => `${d.year}-01-01`);
    const interestRateDates = ratesData.map((d) => {
      const [day, month, year] = d.date.split("-");
      return `${day}-${month}-${year}`;
    });
    const interestRates = ratesData.map((d) => d.refRate);
    const allDates = mergeDates(housingDates, interestRateDates);
    const mappedInterestRates = mapDataToDates(
      allDates,
      interestRateDates,
      interestRates
    );

    let firstLabel = "";
    let secondaryLabel = "";
    let isBothDataPicked = market === "oba rynki";
    let secondaryHousingPrices = [];
    let mappedSecondaryHousingPrices = [];
    let parsedData;

    if (pickedOption === "linearChart") {
      const housingPrices = housingData.map((d) => d.price);
      const mappedHousingPrices = mapDataToDates(
        allDates,
        housingDates,
        housingPrices,
        true
      );

      firstLabel = "Ceny mieszkań - rynek pierwotny";
      secondaryLabel = "Ceny mieszkań - rynek wtórny";
      secondaryHousingPrices = secondaryHousingData.map((d) => d.price);
      mappedSecondaryHousingPrices = mapDataToDates(
        allDates,
        housingDates,
        secondaryHousingPrices,
        true
      );

      parsedData = parseData(
        allDates,
        firstLabel,
        secondaryLabel,
        mappedHousingPrices,
        mappedSecondaryHousingPrices,
        mappedInterestRates,
        isBothDataPicked
      );
    }

    if (pickedOption === "percentageChart") {
      firstLabel = "Zmiany procentowe - rynek pierwotny";
      secondaryLabel = "Zmiany procentowe - rynek wtórny";
      const percentageChangeYearly = calculatePercentageChange(housingData);
      const secondPercentageChangeYearly = calculatePercentageChange(secondaryHousingData);

      percentageChangeYearly.pop();
      secondPercentageChangeYearly.pop();

      const mappedHousingPriceChanges = mapDataToDates(
        allDates,
        housingDates,
        percentageChangeYearly,
        true
      );

      const mappedSecondaryHousingPriceChanges = mapDataToDates(
        allDates,
        housingDates,
        secondPercentageChangeYearly,
        true
      );

      parsedData = parseData(
        allDates,
        firstLabel,
        secondaryLabel,
        mappedHousingPriceChanges,
        mappedSecondaryHousingPriceChanges,
        mappedInterestRates,
        isBothDataPicked
      );
    }

    if (pickedOption !== "barChart" && pickedOption !== "barChartType") {
      parsedData.labels.pop();
      parsedData.datasets[0].data.pop();
      setChartData(parsedData);
    }
  }

  if (!isLoadingBarChartData) {
    const primaryMarket = barChartData.filter((d) => d.transaction === "rynek pierwotny");
    const afterMarket = barChartData.filter((d) => d.transaction === "rynek wtórny");
    const labels = primaryMarket.map((d) => d.name);
    const primatyMarketData = primaryMarket.map((d) => d.price);
    const afterMarketData = afterMarket.map((d) => d.price);
    
    if (labels && primatyMarketData && afterMarketData) {
      const parsedData = parseBarData(labels, primatyMarketData, afterMarketData);
      setBarChart(parsedData);
    }
  }

  if (!isLoadingBarChartDataType) {
    const lowData = barChartDataType.filter((d) => d.surface === "do 40 m2");
    const midData = barChartDataType.filter((d) => d.surface === "od 40,1 do 60 m2");
    const higherData = barChartDataType.filter((d) => d.surface === "od 60,1 do 80 m2");
    const highestData = barChartDataType.filter((d) => d.surface === "od 80,1 m2");
    lowData.pop();
    midData.pop();
    higherData.pop();
    highestData.pop();

    const labels = lowData.map((d) => d.year);
    const lowDataPrice = lowData.map((d) => d.price);
    const midDataPrice = midData.map((d) => d.price);
    const higherDataPrice = higherData.map((d) => d.price);
    const highestDataPrice = highestData.map((d) => d.price);

    if (labels && lowDataPrice && midDataPrice && higherDataPrice && highestDataPrice) {
      const parsedData = parseBarDataType(labels, lowDataPrice, midDataPrice, higherDataPrice, highestDataPrice);
      setBarChartType(parsedData);
    }
  }
}, [
  isLoadingHousing,
  isLoadingSecondaryHousing,
  isLoadingBarChartData,
  isLoadingInterests,
  isLoadingBarChartDataType,
  barChartData,
  barChartDataType,
  housingData,
  ratesData,
  pickedOption
]);


  useEffect(() => {
    if(pickedOption == "barChartType" && market == "oba rynki"){
      setMarket("rynek pierwotny")
    }
  }, [pickedOption])

  return (
    <div>
      <Menu
        year={year}
        setYear={setYear}
        region={region}
        setRegion={setRegion}
        market={market}
        setMarket={setMarket}
        type={type}
        setType={setType}
        dataHousing={housingData}
        dataBarChart={barChartData}
        dataBarChartType={barChartDataType}
        dataRates={ratesData}
        pickedOption={pickedOption}
        setPickedOption={setPickedOption}
      ></Menu>
      <div className="chartCard">
        <div className="chartBox">
          {chartData && (pickedOption == "linearChart" || pickedOption == "percentageChart") ? <LinearChart chartData={chartData} optionsSet={pickedOption}/> : <p></p>}
          {barChartData && pickedOption == "barChart" ? <BarChart chartData={barChart} optionsSet={pickedOption}/> : <p></p>}
          {barChartDataType && pickedOption == "barChartType" ? <BarChart chartData={barChartType} optionsSet={pickedOption}/> : <p></p>}
        </div>
      </div>
    </div>
  );
}

export default Main;
