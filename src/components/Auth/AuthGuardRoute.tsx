import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import FullScreenSpinner from "../full-screen-spinner/FullScreenSpinner";

/* Authentication */
import { useAuth } from "./AuthProvider";

interface Props extends RouteProps {
  component: any;
}

const AuthGuardRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { loading, authenticated } = useAuth();
  return loading ? (
    <FullScreenSpinner />
  ) : authenticated ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default AuthGuardRoute;
