import React, { useState } from "react";

import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";

const pic = `


<div class="card">
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

function Home() {
  return (
    <>
      <Container>
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

export default Home;
