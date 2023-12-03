import { Route, Routes } from "react-router";
import Home from "../components/Home";
import Login from "../components/Login";
import Tableuser from "../components/Table_user";
import PrivateRoute from "./PrivateRoutes";
import Notfond from "../components/Notfound";

const Approutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />{" "}
        {/* <PrivateRoute path="/user">
          <Tableuser />
        </PrivateRoute> */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <Tableuser />
            </PrivateRoute>
          }
        />{" "}
        <Route path="*" element={<Notfond></Notfond>} />
      </Routes>
    </>
  );
};

export default Approutes;
