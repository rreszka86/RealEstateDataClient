import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthGuard = (props) => {
  const token = localStorage.getItem("jwtToken");
  const [authStatus, setAuthStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_SERVER_ADDRESS + "/api/auth/validate",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    return <p>Loading...</p>;
  }
  return authStatus ? props.onAuth : props.onNotAuth;
};

export default AuthGuard;
