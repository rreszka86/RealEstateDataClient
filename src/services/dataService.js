import axios from "axios";

export default class dataService {
    static ipAddress = import.meta.env.VITE_API_SERVER_ADDRESS;
    static token = localStorage.getItem("jwtToken");

    static getHousingData = async (region) => {
        try {
            const res = await axios.get(
                `${this.ipAddress}/api/housingPrices/?name=${region}&transaction=rynek wtórny&surface=od 40,1 do 60 m2`,
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