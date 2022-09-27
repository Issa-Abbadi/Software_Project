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

function Home() {
  const [products, setProducts] = useState([]);
  // const [value, setValue] = React.useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:4000/Products/")
      .then(({ data }) => {
        setProducts(data);
        console.log("True");
        console.log(data);
      })
      .catch((error) => {
        console.log("false");
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setValue((v) => {
  //       return v === 4 ? 0 : v + 1;
  //     });
  //   }, 1500);
  //   return () => clearInterval(interval);
  // }, []);
  function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
      <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
        <Carousel.Item interval={1500}>
          <img
            className="cover d-block w-100"
            src={imgs[0].url}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="cover d-block w-100"
            src={imgs[1].url}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="cover d-block w-100"
            src={imgs[2].url}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }

  let size = Object.keys(products).length;
  console.log(size);

  const RowTable = (i) => {
    console.log("I is equal", i);
    return (
      <>
        <Row>
          <Col sm={6} md={3}>
            <div class="card">
              <div class="hover-overlay ">
                <a href="#!">
                  <img src={products[i].product_img} class="img-fluid" />
                </a>
              </div>

              <div class="card-body">
                <h5 class="card-title">{products[i].product_name}</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#!" class="btn btn-primary">
                  Buy
                </a>
              </div>
            </div>
          </Col>
          <Col sm={6} md={3}>
            <div class="card">
              <div class="hover-overlay ">
                <a href="#!">
                  <img src={products[i + 1].product_img} class="img-fluid" />
                </a>
              </div>

              <div class="card-body">
                <h5 class="card-title">{products[i + 1].product_name}</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#!" class="btn btn-primary">
                  Buy
                </a>
              </div>
            </div>
          </Col>
          <Col sm={6} md={3}>
            <div class="card">
              <div class="hover-overlay ">
                <a href="#!">
                  <img src={products[i + 2].product_img} class="img-fluid" />
                </a>
              </div>

              <div class="card-body">
                <h5 class="card-title">{products[i + 2].product_name}</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#!" class="btn btn-primary">
                  Buy
                </a>
              </div>
            </div>
          </Col>
          <Col sm={6} md={3}>
            <div class="card">
              <div class="hover-overlay ">
                <a href="#!">
                  <img src={products[i + 3].product_img} class="img-fluid" />
                </a>
              </div>

              <div class="card-body">
                <h5 class="card-title">{products[i + 3].product_name}</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#!" class="btn btn-primary">
                  Buy
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const DataTable = () => {
    let ret = [];
    let i = 0;
    for (i = 0; size > 3; i += 4) {
      console.log("IN LOOP");
      ret[i / 4] = RowTable(i);
      size -= 4;
    }
    if (size === 1) {
      ret[i / 4 + 1] = (
        <>
          <Row>
            {" "}
            <Col sm={6} md={3}>
              <div class="card">
                <div class="hover-overlay ">
                  <a href="#!">
                    <img src={products[i].product_img} class="img-fluid" />
                  </a>
                </div>

                <div class="card-body">
                  <h5 class="card-title">{products[i].product_name}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#!" class="btn btn-primary">
                    Buy
                  </a>
                </div>
              </div>
            </Col>
            <Col sm={6} md={3}></Col>
            <Col sm={6} md={3}></Col> <Col sm={6} md={3}></Col>
          </Row>
        </>
      );
    } else if (size === 2) {
      ret[i / 4 + 1] = (
        <>
          <Row>
            {" "}
            <Col sm={6} md={3}>
              <div class="card">
                <div class="hover-overlay ">
                  <a href="#!">
                    <img src={products[i].product_img} class="img-fluid" />
                  </a>
                </div>

                <div class="card-body">
                  <h5 class="card-title">{products[i].product_name}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#!" class="btn btn-primary">
                    Buy
                  </a>
                </div>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div class="card">
                <div class="hover-overlay ">
                  <a href="#!">
                    <img src={products[i + 1].product_img} class="img-fluid" />
                  </a>
                </div>

                <div class="card-body">
                  <h5 class="card-title">{products[i + 1].product_name}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#!" class="btn btn-primary">
                    Buy
                  </a>
                </div>
              </div>
            </Col>
            <Col sm={6} md={3}></Col>
            <Col sm={6} md={3}></Col>
          </Row>
        </>
      );
    } else if (size === 3) {
      ret[i / 4 + 1] = (
        <>
          <Row>
            {" "}
            <Col sm={6} md={3}>
              <div class="card">
                <div class="hover-overlay ">
                  <a href="#!">
                    <img src={products[i].product_img} class="img-fluid" />
                  </a>
                </div>

                <div class="card-body">
                  <h5 class="card-title">{products[i].product_name}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#!" class="btn btn-primary">
                    Buy
                  </a>
                </div>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div class="card">
                <div class="hover-overlay ">
                  <a href="#!">
                    <img src={products[i + 1].product_img} class="img-fluid" />
                  </a>
                </div>

                <div class="card-body">
                  <h5 class="card-title">{products[i + 1].product_name}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#!" class="btn btn-primary">
                    Buy
                  </a>
                </div>
              </div>
            </Col>
            <Col sm={6} md={3}>
              <div class="card">
                <div class="hover-overlay ">
                  <a href="#!">
                    <img src={products[i + 2].product_img} class="img-fluid" />
                  </a>
                </div>

                <div class="card-body">
                  <h5 class="card-title">{products[i + 2].product_name}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#!" class="btn btn-primary">
                    Buy
                  </a>
                </div>
              </div>
            </Col>
            <Col sm={6} md={3}></Col>
          </Row>
        </>
      );
    }

    return ret;
  };

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

  return (
    <>
      <Container className="Home">
        <a href="">
          <ControlledCarousel />
        </a>
        <div class="coverImgs">
          <a href="#">
            <img src="./imgs/cover.jpg" alt="" class="sideImg1" />
          </a>
          <a href="#">
            <img src="../imgs/soft&easy.jpg" alt="" class="sideImg2" />
          </a>
        </div>

        {/* <div className="centerMode">{<CenterMode />}</div> */}
        <Card title="متاجر عرضناها لك" data={imgs} />
        <Card title="الأعلى مبيعاً" data={imgs} />
        <Card title="عروض خاصة" data={imgs} />
        <Card title="جديد" data={imgs} />
        {/* {DataTable()} */}
      </Container>
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
