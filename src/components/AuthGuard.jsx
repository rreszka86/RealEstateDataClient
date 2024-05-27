import React, { useEffect, useState } from "react";
import userService from "../services/userService";

const AuthGuard = (props) => {
	const [authStatus, setAuthStatus] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("jwtToken")
		if (!token) {
			setIsLoading(false)
			return
		}
		userService.validateToken(token).then((res) => {
			setAuthStatus(res);
		}).catch((err) => {
			console.log("Could not validate token.");
		}).finally(() => {
			console.log("dziala??")
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return authStatus ? props.onAuth : props.onNotAuth;
};

export default AuthGuard;
