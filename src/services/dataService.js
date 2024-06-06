import axios from "axios";

export default class dataService {
    static ipAddress = import.meta.env.VITE_API_SERVER_ADDRESS;
    static token = localStorage.getItem("jwtToken");

    static getHousingData = async (region, market, type) => {
        try {
            const res = await axios.get(
                `${this.ipAddress}/api/housingPrices/?name=${region}&transaction=${market}&surface=${type}`,
                {
                    headers: { Authorization: `Bearer ${this.token}` },
                }
            );
            return res.data
        } catch (error) {
            console.error(error);
        }
    };

    static getHousingDataForBarChart = async (year, type) => {
        try {
            const res = await axios.get(
                `${this.ipAddress}/api/housingPrices/?year=${year}&surface=${type}`,
                {
                    headers: { Authorization: `Bearer ${this.token}` },
                } 
            );
            return res.data
        } catch (error) {
            console.error(error);
        }
    };

    static getRatesData = async () => {
        try {
            const res = await axios.get(
                `${this.ipAddress}/api/interestRates/?fromDate=2013-01-01&toDate=2022-12-30`,
                {
                    headers: { Authorization: `Bearer ${this.token}` },
                }
            );
            return res.data
        } catch (error) {
            console.error(error);
        }
    }
}