import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import "https://kit.fontawesome.com/a076d05399.js";

function footer() {
  return (
    <>
      <footer
        class="text-center text-lg-start bg-dark text-muted "
        style={{ "z-index": "1000" }}
      >
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div>
            <a href="#" class="me-4 text-reset">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="me-4 text-reset">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="me-4 text-reset">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" class="me-4 text-reset">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="me-4 text-reset">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="#" class="me-4 text-reset">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section class="">
          <div class="container text-center text-md-start mt-5">
            <div class="row mt-3">
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">
                  <i class="fas fa-gem me-3"></i>Houseware
                </h6>
                <p>We are a company providing the best Houseware for you </p>
              </div>

              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" class="text-reset">
                    Tools
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Tools
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Tools
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Tools
                  </a>
                </p>
              </div>

              <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" class="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" class="text-reset">
                    Help
                  </a>
                </p>
              </div>

              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i class="fas fa-home me-3"></i> New York, NY 10012, US
                </p>
                <p>
                  <i class="fas fa-envelope me-3"></i>
                  info@example.com
                </p>
                <p>
                  <i class="fas fa-phone me-3"></i> + 01 234 567 88
                </p>
                <p>
                  <i class="fas fa-print me-3"></i> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <div
          class="text-center p-4"
          style="background-color: rgba(0, 0, 0, 0.05);"
        >
          <a class="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div> */}
      </footer>
    </>
  );
}

export default footer;
