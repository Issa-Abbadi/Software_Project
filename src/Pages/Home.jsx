import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterMode from "../components/CenterMode";
import Card from "../components/Card";
import "./Home.css";
import { BrowserRouter, Route, Routes } from "react-router-dom/dist";
import Analytics from "./Analytics";
import Sidebar from "../components/Sidebar";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BestRatingChart from "../components/BestRatingChart";

function Home() {
  const theme = useTheme();
  const [markets, setMarkets] = useState([]);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const config = isMatch ? "500px" : "100%";

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

  function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    return (
      <div style={{ height: "100%", overflow: "hidden" }}>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          variant="dark"
          style={{ display: "flex" }}
        >
          <Carousel.Item
            interval={1500}
            style={{ height: "100%", overflow: "hidden" }}
          >
            <img
              className="cover d-block w-100"
              src={imgs[0].url}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>الأدوات</h3>
              <p> </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="cover d-block w-100"
              src={imgs[1].url}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>الأدوات</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="cover d-block w-100"
              src={imgs[2].url}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>الأدوات</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }

  // let size = Object.keys(products).length;
  //console.log(size);

  const imgs = [
    {
      url: "https://images.unsplash.com/photo-1556910096-6f5e72db6803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1572656934803-d2162b2e98bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1556909211-36987daf7b4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1501924497965-792fefaea3dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    },
  ];

  const imgs2 = [
    {
      url: require("../assets/Stores/FahadHome.jpg"),
      market_name: "الفهد",
      target: "/markets",
    },
    {
      url: require("../assets/Stores/Rawafed.jpg"),
      market_name: "الروافد",
      target: "/markets",
    },
    {
      url: require("../assets/Stores/Saeed.jpg"),
      market_name: "السيد",
      target: "/markets",
    },
    {
      url: require("../assets/Stores/Shames.jpg"),
      market_name: "شمس",
      target: "/markets",
    },
    {
      url: require("../assets/Stores/kaery.jpg"),
      market_name: "الخيري",
      target: "/markets",
    },
  ];
  //console.log('"' + imgs2[0].url + '"');

  return (
    <>
      <div style={{ display: "inline-block", width: "100%" }}>
        <Container className="Home">
          {markets.length !== 0 && (
            <div
              style={{
                width: "auto",

                "max-width": "2000px",
                height: "calc(100vh - 75px)",
                display: "block",
              }}
            >
              <BestRatingChart
                markets={markets}
                style={{ height: "calc(100vh - 75px)" }}
              />
            </div>
          )}
          <div
            style={{
              overflow: "hidden",
              height: "100%",
              width: config,
            }}
          >
            <a href="">
              <ControlledCarousel />
            </a>
          </div>
          {/* <div class="coverImgs">
            <a href="#">
              <img src="./imgs/cover.jpg" alt="" class="sideImg1" />
            </a>
            <a href="#">
              <img src="../imgs/soft&easy.jpg" alt="" class="sideImg2" />
            </a>
          </div> */}
          {/* <div className="centerMode">{<CenterMode />}</div> */}

          <div style={{ width: config }}>
            <Card
              title="متاجر عرضناها لك"
              data={markets}
              target="/markets"
              style={{ margin: "20%" }}
            />
          </div>

          <h1>
            {" "}
            <div class="separator">انتقل بمطبخك الى مستوى اخر من التطور</div>
          </h1>
          <a href="/kitchenProducts">
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#eee",
                position: "relative",
                height: "400px",
                width: config,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "Center",
              }}
            >
              <div style={{ height: "400px", overflow: "hidden" }}>
                <img
                  style={{ height: "400px", flex: "1" }}
                  src={require("../assets/kitchen/goodKitchen.jpg")}
                />
              </div>

              <div id="arrowAnim" style={{ flex: "3" }}>
                <div class="arrowSliding">
                  <div class="arrow"></div>
                </div>
                <div class="arrowSliding delay1">
                  <div class="arrow"></div>
                </div>
                <div class="arrowSliding delay2">
                  <div class="arrow"></div>
                </div>
                <div class="arrowSliding delay3">
                  <div class="arrow"></div>
                </div>
              </div>
              <div style={{ height: "400px", overflow: "hidden" }}>
                <img
                  style={{ height: "400px", flex: "1" }}
                  src={require("../assets/kitchen/badKitchen.jpg")}
                />
              </div>
            </div>
          </a>
          <h1>
            {" "}
            <div class="separator"></div>
          </h1>
          <a href="/tableProducts">
            <div
              style={{
                marginTop: "40px",
                backgroundColor: "#eee",
                position: "relative",
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "Center",
              }}
            >
              <img
                src={require("../assets/table/forksInGlass.jpg")}
                style={{
                  height: "400px",
                  width: "20%",
                  position: "absolute",
                  right: "0",
                }}
              />
              <div>
                <h5
                  style={{
                    textAlign: "right",
                    height: "400px",
                    width: "15%",
                    position: "absolute",
                    fontWeight: "bold",
                    fontSize: "5vw",
                    color: "var(--dark-liver-horses)",
                    top: "5% ",
                    right: "27%",
                  }}
                >
                  الترتيب أساس في السفرة
                </h5>
              </div>
              <img
                style={{
                  height: "400px",
                  width: "55%",
                  position: "absolute",
                  left: "0",
                }}
                src={require("../assets/table/table.jpg")}
              />{" "}
            </div>
          </a>
          <h1>
            {" "}
            <div class="separator"></div>
          </h1>
          <a href="/homeProducts">
            <div
              style={{
                marginTop: "40px",
                backgroundColor: "#eee",
                position: "relative",
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "Center",
              }}
            >
              <h5
                style={{
                  textAlign: "right",
                  height: "400px",
                  width: "15%",
                  position: "absolute",
                  fontWeight: "bold",
                  fontSize: "5vw",
                  color: "var(--dark-liver-horses)",
                  top: "5% ",
                  right: "5%",
                }}
              >
                أضف اللون القوي لمنزلك
              </h5>
              <img
                src={require("../assets/home/greentable.jpg")}
                style={{
                  height: "400px",
                  width: "25%",
                  position: "absolute",
                  right: "25%",
                  opacity: "0.25",
                }}
              />
              <img
                src={require("../assets/home/greentable.jpg")}
                style={{
                  height: "400px",
                  width: "25%",
                  position: "absolute",
                  right: "50%",
                  opacity: "0.6",
                }}
              />

              <img
                src={require("../assets/home/greentable.jpg")}
                style={{
                  height: "400px",
                  width: "25%",
                  position: "absolute",
                  right: "75%",
                }}
              />
            </div>
          </a>

          {/* <Card title="الأعلى مبيعاً" data={imgs} />
          <Card title="عروض خاصة" data={imgs} />
          <Card title="جديد" data={imgs} /> */}
          {/* {DataTable()} */}
        </Container>
      </div>
    </>
  );
}

export default Home;

{
  /* <Container>
<Row>
  <Col sm={7}>
    <div class="img-container" style={{ "max-width": "22rem" }}>
      <img
        src="https://mdbootstrap.com/img/new/standard/city/053.webp"
        class="w-100"
      />
    </div>
  </Col>
</Row>
</Container> */
}

// const navigate = useNavigate()

//     useEffect(() => {
//         const token = localStorage.getItem('TOKEN')
//         if (!token) {
//             navigate('/signin')
//         }
//     }, [])

{
  /* <div>HOME</div>
            <div>
                <span> {localStorage.getItem('EMAIL')} </span>
                <button
                    onClick={() => {
                        localStorage.clear()
                        navigate('/signin')
                    }}
                > LOGOUT </button> */
}
