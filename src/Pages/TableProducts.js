import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

function TableProducts(props) {
  const [products, setProducts] = useState([]);
  let size = Object.keys(products).length;

  useEffect(() => {
    axios
      .get("http://localhost:4000/Products/table")
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
  return <>{DataTable()};</>;
}

export default TableProducts;
