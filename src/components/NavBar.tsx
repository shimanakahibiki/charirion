import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const NavBar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        context.isLoggedIn = false
        context.uid = ""
        context.name = ""
        context.email = ""
        context.role = 0
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleTitleButton = () =>{
    navigate("/")

  }

  const handleMyPageButton = () =>{
    navigate("/mypage")

  }

  

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={handleTitleButton}>Charirion-app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {context.isLoggedIn ? (
              <NavDropdown title={context.name} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleMyPageButton}>マイページ</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  ログアウト
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to={"/login"} className="text-black-50">
                ログイン
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
