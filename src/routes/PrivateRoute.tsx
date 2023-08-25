import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/shared/Loading";
import { useAppSelector } from "../app/hooks";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { data } = useAppSelector((state) => state.user);

  const isLoading = false;

  const { pathname } = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!data || (!data.email && !isLoading)) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};
export default PrivateRoute;
