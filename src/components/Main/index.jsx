import axios from "axios";
import { useState, useEffect } from "react";
import LinearChart from "./LinearChart";
import Menu from "./ChartNav";

function Main() {
	const [data, setData] = useState([]);
	const [chartData, setChartData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [region, setRegion] = useState("LUBELSKIE");

	const getData = async () => {
		const token = localStorage.getItem("jwtToken");

		try {
			const res = await axios.get(
				`${
					import.meta.env.VITE_API_SERVER_ADDRESS
				}/api/housingPrices/?name=${region}&transaction=rynek wtórny&surface=od 40,1 do 60 m2`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setData(res.data);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, [region]);

	useEffect(() => {
		if (!isLoading) {
			const parsedData = {
				labels: data.map((d) => d.year),
				datasets: [
					{
						label: "Dane mieszkaniowe",
						data: data.map((d) => d.price),
					},
				],
			};
			parsedData.labels.pop();
			parsedData.datasets[0].data.pop();
			setChartData(parsedData);
		}
	}, [isLoading, data]);

	return (
		<div>
			<Menu region={region} setRegion={setRegion}></Menu>
			{chartData ? <LinearChart chartData={chartData} /> : <p></p>}
		</div>
	);
}

export default Main;
