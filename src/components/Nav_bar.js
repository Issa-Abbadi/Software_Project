import React, { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "https://kit.fontawesome.com/a076d05399.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBIcon } from "mdb-react-ui-kit";

import { Link } from "react-router-dom";

function Nav_bar() {
  const [isLogin, setIsLogin] = useState(0);
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <a class="navbar-brand" href="/">
          <img
            src="LOGO2.png"
            alt="Logo"
            width="60"
            height="48"
            class="d-inline-block align-text-mid"
            margin="0"
            padding="0"
          ></img>
          Houseware
        </a>
        <Container>
          <Navbar.Toggle aria-controls="ftco-nav" />
          <Navbar.Collapse id="ftco-nac">
            <Nav className="me-auto">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <Link to="/" class="nav-link">
                    {" "}
                    Home
                  </Link>
                </li>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <li class="nav-item">
                  <a href="#" class="nav-link">
                    Catalog
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    Blog
                  </a>
                </li>
                <li class="nav-item">
                  <Link to="/about" class="nav-link">
                    About
                  </Link>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>

          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
          {!isLogin && (
            <>
              <a class="text-reset m-2" href="/cart">
                <i
                  class="fas fa-shopping-cart"
                  style={{ color: "#0d6efd" }}
                ></i>
              </a>
              <NavDropdown
                id="nav-dropdown-dark-example2"
                title={
                  <a
                    class="text-reset m-2 dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fas fa-bell " style={{ color: "#0d6efd" }}></i>
                    <span
                      class="badge rounded-pill badge-notification bg-danger"
                      style={{ width: "20px" }}
                    >
                      1
                    </span>
                  </a>
                }
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                id="nav-dropdown-dark-example2 "
                style={{
                  margin: "0",
                  padding: "0",
                }}
                title={
                  <div>
                    <a class="align-start">
                      <MDBIcon
                        fas
                        icon="heart"
                        style={{
                          color: "red",
                          width: "10px",
                          "margin-top": "0px",

                          "padding-top": "px",
                          "margin-bottom": "0px",
                        }}
                      />
                    </a>
                  </div>
                  // <i class="fa-solid fa-heart" ></i>
                }
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                align="end"
                id="nav-dropdown-dark-example3"
                title={
                  <a
                    class="dropdown-toggle hidden-arrow align-start"
                    href="/profile"
                    id="navbarDropdownMenuAvatar"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      class="rounded-circle"
                      height="30"
                      alt="Black and White Portrait of a Man"
                      loading="lazy"
                    />
                  </a>
                }
                menuVariant="dark"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          {isLogin && (
            <>
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  {" "}
                  <Link to="/login" class="nav-link">
                    {" "}
                    Login
                  </Link>
                </li>
              </ul>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Nav_bar;
