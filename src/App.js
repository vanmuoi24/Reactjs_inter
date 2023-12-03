import { Row } from "react-bootstrap";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "./context/UseContex";
import { useContext } from "react";
import Approutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";

function App() {
  const { user } = useContext(UserContext);
  const dataredux = useSelector((state) => state.user.user);
  console.log(dataredux);
  return (
    <>
      <div className="app-container">
        <Container>
          <BrowserRouter>
            <Header></Header>
            <Approutes />
          </BrowserRouter>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
