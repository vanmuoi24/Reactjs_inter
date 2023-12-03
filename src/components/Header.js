import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UseContex";
import { NavItem } from "react-bootstrap";
const Header = (props) => {
  const { logout, user } = useContext(UserContext);
  // const [hideHeader, sethideHeader] = useState(false);

  // const location = useLocation();
  let navi = useNavigate();
  const handlelogOut = () => {
    logout();
    navi("/");
  };

  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     sethideHeader(true);
  //   }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {((user && user.auth) || window.location.pathname === "/") && (
              <>
                {" "}
                <Nav className="me-auto">
                  <NavLink to={"/"} className="nav-link ">
                    Home
                  </NavLink>
                  <NavLink to={"/user"} className="nav-link ">
                    Manage User
                  </NavLink>
                </Nav>
                <Nav>
                  {" "}
                  {user && user.email ? (
                    <span className=" nav-link ">Xin chào {user.email}</span>
                  ) : (
                    false
                  )}{" "}
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {user && user.auth === true ? (
                      <NavDropdown.Item
                        className=" dropdown-item "
                        onClick={() => handlelogOut()}
                      >
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to={"/login"} className=" dropdown-item ">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
