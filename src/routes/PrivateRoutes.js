import { Route, Routes } from "react-router";
import Tableuser from "../components/Table_user";
import { useContext } from "react";
import { UserContext } from "../context/UseContex";
const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return <>You don't have premisoin runnd</>;
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
