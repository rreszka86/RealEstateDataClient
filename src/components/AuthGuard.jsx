import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Main from "./Main"

const validate = async (props) => {
    const ipAddress = "http://localhost:8080"
    const token = localStorage.getItem('jwtToken');
    
    var auth = false;

    await axios.get(ipAddress + "/api/auth/validate", {
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(function(res){
        console.log(res.data);
        auth = res.data
    }).catch(function(err){
        console.log(err);
    });

    return auth;
}

const authStatus = await validate();

const AuthGuard = () => {
    return authStatus ? <Main/> : <Navigate to="/login"></Navigate>;
}

export default AuthGuard
