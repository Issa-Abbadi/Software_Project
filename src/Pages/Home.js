import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";

const pic = `<div class="card">
<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
  <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" class="img-fluid"/>
  <a href="#!">
    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
  </a>
</div>
<div class="card-body">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  <a href="#!" class="btn btn-primary">Button</a>
</div>
</div>`;

const header = `<header>


<!-- Background image -->
<div
  class="p-5 text-center bg-image"
  style="
    background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp');
    height: 550px;
  "
>
  <div class="mask " style="background-color: rgba(0, 0, 0, 0.6);">
    <div class="d-flex justify-content-center align-items-center" style="  color:black;  height: 100%;
    width: 100%;
    object-fit: contain;
    position: relative;
    top: 0;
    left: 0;">
      <div class="text-white">
        <h1 class="mb-3">Heading</h1>
        <h4 class="mb-3">Subheading</h4>
        <a class="btn btn-outline-light btn-lg" href="#!" role="button"
        >Call to action</a
        >
      </div>
    </div>
  </div>
</div>
<!-- Background image -->
</header>`;

function Home() {
  return (
    <>
      <Container>
        <Row sm={7}>
          <div dangerouslySetInnerHTML={{ __html: header }} />
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>

          <Col>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
          <Col>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>

          <Col>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
          <Col>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
        </Row>{" "}
        <Row>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>

          <Col>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
          <Col>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
        </Row>{" "}
        <Row>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>

          <Col>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
          <Col>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
        </Row>{" "}
        <Row>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>

          <Col>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
          <Col>
            {" "}
            <div dangerouslySetInnerHTML={{ __html: pic }} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

{
  /*  */
}
export default Home;
