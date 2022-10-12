import React, { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "https://kit.fontawesome.com/a076d05399.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBIcon } from "mdb-react-ui-kit";
import "./navbar.css";

import { Link } from "react-router-dom";

function Nav_bar() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("EMAIL"));
  const [showKitchen, setShowKitchen] = useState(false);
  const showKitchenDropdown = (e) => {
    setShowKitchen(!showKitchen);
  };
  const hideKitchenDropdown = (e) => {
    setShowKitchen(false);
  };
  const [showTable, setShowTable] = useState(false);
  const showTableDropdown = (e) => {
    setShowTable(!showTable);
  };
  const hideTableDropdown = (e) => {
    setShowTable(false);
  };

  const [showHome, setShowHome] = useState(false);
  const showHomeDropdown = (e) => {
    setShowHome(!showHome);
  };
  const hideHomeDropdown = (e) => {
    setShowHome(false);
  };

  const [showMarket, setShowMarket] = useState(false);
  const showMarketDropdown = (e) => {
    setShowMarket(!showMarket);
  };
  const hideMarketDropdown = (e) => {
    setShowMarket(false);
  };

  return (
    <>
      <div style={{ height: "75px" }}>
        <Navbar
          style={{ top: "0", height: "75px" }}
          class="navbar"
          bg="dark"
          variant="dark"
          expand="lg"
          fixed="top"
        >
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
              <Nav className="me-auto" bsStyle="tabs">
                <ul class="navbar-nav mr-auto">
                  <NavDropdown
                    title={
                      <>
                        <Link class="navbar-link" to="/kitchenProducts">
                          {" "}
                          المطبخ
                        </Link>
                      </>
                    }
                    id="collasible-nav-dropdown"
                    show={showKitchen}
                    onMouseEnter={showKitchenDropdown}
                    onMouseLeave={hideKitchenDropdown}
                    menuVariant="dark"
                    className="li"
                  >
                    <NavDropdown.Item href="#action/3.1">
                      رفايع المطبخ
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      أواني الطبخ
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      توزيع وتوابل
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={
                      <>
                        <Link class="navbar-link" to="/tableProducts">
                          {" "}
                          السفرة{" "}
                        </Link>
                      </>
                    }
                    id="collasible-nav-dropdown"
                    show={showTable}
                    onMouseEnter={showTableDropdown}
                    onMouseLeave={hideTableDropdown}
                    menuVariant="dark"
                    className="li"
                  >
                    <NavDropdown.Item href="#action/3.1">
                      أدوات زجاجية
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      أطقم سفرة
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      شاي وجاتوه
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      أركوبيركس
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      شوك ومعالق
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      تقديم
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      خذف وبورسلين
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      وبونشاينا
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={
                      <>
                        <Link class="navbar-link" to="/homeProducts">
                          {" "}
                          المنزل{" "}
                        </Link>
                      </>
                    }
                    id="collasible-nav-dropdown"
                    show={showHome}
                    onMouseEnter={showHomeDropdown}
                    onMouseLeave={hideHomeDropdown}
                    menuVariant="dark"
                    className="li"
                  >
                    <NavDropdown.Item href="#action/3.1">
                      رفايع الحمام
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={
                      <>
                        <Link class="navbar-link" to="/markets">
                          {" "}
                          متاجرنا{" "}
                        </Link>
                      </>
                    }
                    id="collasible-nav-dropdown"
                    show={showMarket}
                    onMouseEnter={showMarketDropdown}
                    onMouseLeave={hideMarketDropdown}
                    menuVariant="dark"
                    className="li"
                  >
                    <NavDropdown.Item href="#action/3.1">
                      الفهد
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.1">
                      شمس الشام
                    </NavDropdown.Item>
                  </NavDropdown>
                </ul>
              </Nav>
            </Navbar.Collapse>

            <form class="d-flex col-md-4" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="بحث"
                aria-label="Search"
                Style={{ width: "400px" }}
              />
              <button class="btn btn-outline-primary" type="submit">
                بحث
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
                {/* <NavDropdown
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
              </NavDropdown> */}
                {/* <NavDropdown
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
              </NavDropdown> */}

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
                      <div id="profilePic"></div>
                      {/* <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      class="rounded-circle"
                      height="30"
                      alt="Black and White Portrait of a Man"
                      loading="lazy"
                    /> */}
                    </a>
                  }
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/login">
                    تسجيل دخول / إنشاء حساب
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {isLogin && (
              <>
                <a class="text-reset m-2" href="/cart">
                  <i
                    class="fas fa-shopping-cart"
                    style={{ color: "#0d6efd" }}
                  ></i>
                </a>
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
                  <NavDropdown.Item href="/cart">تفاصيل الطلب</NavDropdown.Item>
                  <NavDropdown.Item href="/login">
                    تسجيل دخول / إنشاء حساب
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/profile">حسابي</NavDropdown.Item>

                  <NavDropdown.Item href="#action/3.4">
                    قائمة الرغبات
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/login"
                    onClick={localStorage.clear()}
                  >
                    تسجيل خروج
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default Nav_bar;
