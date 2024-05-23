import axios from "axios"
import LinearChart from "./LinearChart"
import { useState, useEffect } from "react"

function Main() {
    const [data, setData] = useState([])
    const [chartData, setChartData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getData = async () => {
        const ipAddress = "http://localhost:8080"
        const token = localStorage.getItem("jwtToken");

        try {
            const res = await axios.get(`${ipAddress}/api/housingPrices/?name=LUBELSKIE&transaction=rynek wtórny&surface=od 40,1 do 60 m2`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("pobrano dane");
            setData(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!isLoading) {
            const parsedData = {
                labels: data.map((d) => d.year),
                datasets: [
                    {
                        label: "Dane mieszkaniowe",
                        data: data.map((d) => d.price),
                    }
                ]
            };
            parsedData.labels.pop()
            parsedData.datasets[0].data.pop()
            setChartData(parsedData);
        }
    }, [isLoading, data]);

    return (
        <div>
            <h1>Zalogowano</h1>
            <button className='btn btn-primary' onClick={getData}>Pobierz</button>
            {chartData ? <LinearChart chartData={chartData} /> : <p></p>}
        </div>
    )
}

export default Main
