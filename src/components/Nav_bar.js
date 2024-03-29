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
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gettoken, onMessageListener } from "../components/firebase";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import axios from "axios";
import "./navbar.css";
import Dashboard from "./Dashboard";
import { Toast } from "react-bootstrap";

firebase.initializeApp({
  apiKey: "AIzaSyCgLBah0eGYaTVSqc_kfdv4tCGeOiHA2ZQ",
  authDomain: "chat-system-67034.firebaseapp.com",
  projectId: "chat-system-67034",
  storageBucket: "chat-system-67034.appspot.com",
  messagingSenderId: "123521492390",
  appId: "1:123521492390:web:0c70c6a21c66c60ee15b67",
  measurementId: "G-E0KBFPD6JL",
});
const firestore = firebase.firestore();

function Nav_bar(props) {
  const navigate = useNavigate();
  let collection = "h";
  let collection2 = "h";
  if (localStorage.getItem("EMAIL") !== null) {
    collection = localStorage.getItem("EMAIL");
    collection2 = "ClientsNotifications";
  }

  const userRef = firestore.collection(collection);
  const user2Ref = firestore.collection(collection2);
  const [markets, setMarkets] = useState([]);
  let query1;
  if (localStorage.getItem("EMAIL") !== null)
    if (localStorage.getItem("EMAIL").includes("@houseware")) {
      query1 = userRef
        .where("seen", "==", false)
        .orderBy("createdAt", "desc")
        .limit(5);
    } else {
      query1 = user2Ref
        .where("seen", "==", false)
        .where("Touid", "==", localStorage.getItem("EMAIL"))
        .orderBy("createdAt", "desc")
        .limit(5);
    }

  let [notification] = useCollectionData(query1, { idField: "id" });

  useEffect(() => {
    if (localStorage.getItem("EMAIL") !== null) {
      gettoken(setTokenFound);
      onMessageListener()
        .then((payload) => {
          setShow(true);
          setNotify({
            title: payload.notification.title,
            body: payload.notification.body,
          });
          console.log(payload);
        })
        .catch((err) => console.log("failed: ", err));
      if (notification) {
        setNotifications(notification);
      } else {
        setNotifications("");
      }
    }
  }, [notification]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/login/markets/")
      .then(({ data }) => {
        setMarkets(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [isLogin, setIsLogin] = useState(props.login);
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notify, setNotify] = useState({ title: "", body: "" });
  const [notifications, setNotifications] = useState("");

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

  const _handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      localStorage.setItem("search", e.target.value);
      navigate("/allProducts");
    }
  };

  const setNotifyTrue = (notify) => {
    props.setChating();
  };

  const getMarkets = () => {
    if (markets.length === 0) {
      return [];
    }
    if (markets.length !== 0) {
      return markets.map((market) => {
        return (
          <NavDropdown.Item>
            <Link
              to="/markets"
              state={{ product: market }}
              style={{ color: "white", textDecoration: "none" }}
            >
              {market.name}
            </Link>
          </NavDropdown.Item>
        );
      });
    }
  };
  return (
    <>
      <div style={{ minHeight: "75px" }}>
        <Navbar
          style={{
            top: "0",
            minHeight: "75px",
            direction: "rtl",

            display: "flex",
            "justify-content": "space-around",
            "flex-wrap": "nowrap",
          }}
          class="navbar"
          // bg="dark"
          variant="dark"
          expand="md"
          fixed="top"
        >
          <a class="navbar-brand" href="/">
            <img
              src={require("../assets/LOGO2.png")}
              alt="Logo"
              width="60"
              height="48"
              class="d-inline-block align-text-mid"
              margin="0"
              padding="0"
            ></img>
            {/* Houseware */}
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
                    onClick={() => {
                      // navigate(0);
                    }}
                  >
                    <NavDropdown.Item
                      eventkey="1"
                      href="/kitchenProducts/kitchen-accessories"
                    >
                      رفايع المطبخ
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventkey="2"
                      href="/kitchenProducts/cooking-tools"
                    >
                      أواني الطبخ
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventkey="3"
                      href="/kitchenProducts/distribution"
                      state=""
                    >
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
                    <NavDropdown.Item
                      href="/tableProducts/glassware"
                      eventKey="1"
                    >
                      أدوات زجاجية
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="/tableProducts/dining-sets"
                      eventKey="2"
                    >
                      أطقم سفرة
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="/tableProducts/tea-and-gatoh"
                      eventKey="3"
                    >
                      شاي وجاتوه
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="/tableProducts/archopyrex"
                      eventKey="4"
                    >
                      أركوبيركس
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="/tableProducts/forks-and-spoons"
                      eventKey="5"
                    >
                      شوك ومعالق
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/tableProducts/submit" eventKey="6">
                      تقديم
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="/tableProducts/throw-and-porcelain"
                      eventKey="7"
                    >
                      خذف وبورسلين
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="/tableProducts/punchanya"
                      eventKey="8"
                    >
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
                    <NavDropdown.Item
                      href="/homeProducts/bathroom-accessories"
                      eventkey="1"
                    >
                      رفايع الحمام
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={
                      <>
                        <Link class="navbar-link"> متاجرنا </Link>
                      </>
                    }
                    id="collasible-nav-dropdown"
                    show={showMarket}
                    onMouseEnter={showMarketDropdown}
                    onMouseLeave={hideMarketDropdown}
                    menuVariant="dark"
                    className="li"
                  >
                    {markets.length !== 0 && getMarkets()}
                  </NavDropdown>
                </ul>
              </Nav>
            </Navbar.Collapse>

            <form class="d-flex col-md-6" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="بحث"
                aria-label="Search"
                onKeyDown={(e) => _handleKeyDown(e)}
                style={{ marginLeft: "5px" }}
              />
              {/* <button
                style={{ margin: "0px 10px" }}
                class="btn btn-outline-primary"
                type="submit"
              >
                بحث
              </button> */}
            </form>
            {!isLogin && (
              <>
                {/* <a class="text-reset m-2" href="/cart">
                  <i
                    class="fas fa-shopping-cart"
                    style={{ color: "#0d6efd" }}
                  ></i>
                </a> */}
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
                  id="nav-dropdown-dark-example3"
                  title={
                    <a
                      id="profileLink"
                      href="/profile"
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
                {/* <a class="text-reset m-2" href="/cart">
                  <i
                    class="fas fa-shopping-cart"
                    style={{ color: "#0d6efd" }}
                  ></i>
                </a> */}
                <NavDropdown
                  id="nav-dropdown-dark-example3"
                  title={
                    <a
                      href="/profile"
                      id="navbarDropdownMenuAvatar"
                      role="button"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span></span>

                      <Avatar
                        src={
                          JSON.parse(localStorage.getItem("Profile")).imageUrl
                        }
                        referrerpolicy="no-referrer"
                      />
                    </a>
                  }
                  menuVariant="dark"
                >
                  {localStorage.getItem("EMAIL").includes("@houseware") && (
                    <NavDropdown.Item href="/admin"> الإدارة</NavDropdown.Item>
                  )}
                  <NavDropdown.Item href="/profile">حسابي</NavDropdown.Item>

                  <NavDropdown.Item href="/wishList">
                    قائمة الرغبات
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/cart">السلة</NavDropdown.Item>
                  <NavDropdown
                    style={{ direction: "ltr" }}
                    id="nav-dropdown-dark-example3"
                    menuVariant="dark"
                    title=" التنبيهات"
                  >
                    {notifications !== "" &&
                      notifications.map((notify) => {
                        return (
                          <NavDropdown.Item onClick={setNotifyTrue(notify)}>
                            {notify.name}يوجد لديك رسالة من
                          </NavDropdown.Item>
                        );
                      })}
                  </NavDropdown>

                  <NavDropdown.Item href="/logout">
                    <GoogleLogout
                      clientId={localStorage.getItem("ClientID")}
                      buttonText="تسجيل خروج"
                    />
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Container>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={5000}
            autohide
            animation
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              minWidth: 200,
            }}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{notify.title}</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>{notify.body}</Toast.Body>
          </Toast>
        </Navbar>
      </div>
    </>
  );
}

export default Nav_bar;
