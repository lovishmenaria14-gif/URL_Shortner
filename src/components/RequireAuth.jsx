import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UrlState } from "../Context";
import { BeatLoader } from "react-spinners";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = UrlState();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/Auth?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};

export default RequireAuth;