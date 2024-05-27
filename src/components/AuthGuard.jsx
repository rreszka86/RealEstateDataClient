import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthGuard = (props) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = async (token) => {
	if(!token){
		setIsLoading(false)
		return
	}
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_SERVER_ADDRESS + "/api/auth/validate",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Token verification status: " + res.data);
      setAuthStatus(res.data);
    } catch (err) {
      console.log(err);	  
    } finally {
		setIsLoading(false)
	}
  };

  useEffect(() => {
	const token = localStorage.getItem("jwtToken")
	validateToken(token)
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return authStatus ? props.onAuth : props.onNotAuth;
};

export default AuthGuard;
