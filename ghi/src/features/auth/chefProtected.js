import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ChefProtected = ({ token }) => {
    return (
        token.account.is_chef === false ?
        <Navigate to="/home" replace />
        :
        <Outlet />
    );
};

export default ChefProtected;
