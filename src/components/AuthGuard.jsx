import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Main from "./Main";

const AuthGuard = () => {
	const token = localStorage.getItem("jwtToken");
	const [authStatus, setAuthStatus] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const validateToken = async () => {
		const ipAddress = "http://localhost:8080";

		try {
			const res = await axios.get(ipAddress + "/api/auth/validate", {
				headers: { Authorization: `Bearer ${token}` },
			});

			console.log("Token verification status: " + res.data);
			setAuthStatus(res.data);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		validateToken();
	}, [token]);

	if (isLoading) {
		return <p>Loading</p>;
	}
	return authStatus ? <Main /> : <Navigate to="/login"></Navigate>;
};

export default AuthGuard;
