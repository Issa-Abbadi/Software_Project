import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./navbar.css"
import "https://kit.fontawesome.com/a076d05399.js";

function footer() {
  return (
    <>
      <footer
        class="text-center text-lg-start  text-muted "
        style={{ "z-index": "1000" }}
      >
        <section class="footer">
          <div class="container text-center text-md-start mt-5">
            <div class="row mt-3">
              <div
                class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4"
                id="footHead"
              >
                <h6 class="text-uppercase fw-bold mb-4">
                  <i class="fas fa-gem me-3"></i>Houseware
                </h6>
                <p>We are a company providing the best Houseware for you </p>
                <div>
                  <a
                    href="https://www.facebook.com/"
                    class="me-4 text-reset"
                    id="social"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://twitter.com/"
                    class="me-4 text-reset"
                    id="social"
                  >
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a
                    href="https://google.com/"
                    class="me-4 text-reset"
                    id="social"
                  >
                    <i className="fab fa-google"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    class="me-4 text-reset"
                    id="social"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    class="me-4 text-reset"
                    id="social"
                  >
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="https://github.com/"
                    class="me-4 text-reset"
                    id="social"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                </div>
              </div>

              <div
                class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
                id="footHead"
              >
                <h6 class="text-uppercase fw-bold mb-4">خدمة العملاء</h6>

                <p className="link-color">
                  <a href="/support" class="text-reset">
                    تواصل معنا
                  </a>
                </p>
                <p className="link-color">
                  <a href="/FAQ" class="text-reset">
                    الأسئلة الشائعة
                  </a>
                </p>
              </div>

              <div
                class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4"
                id="footHead"
              >
                <h6 class="text-uppercase fw-bold mb-4">تعرف أكثر</h6>
                <p className="link-color">
                  <a href="/aboutUs" class="text-reset">
                    عن الموقع{" "}
                  </a>
                </p>

                <p className="link-color">
                  <a href="/conditionsOfUse" class="text-reset">
                    شروط الاستخدام
                  </a>
                </p>
                <p className="link-color">
                  <a href="/privacy" class="text-reset">
                    الخصوصية
                  </a>
                </p>
              </div>

              <div
                class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4"
                id="footHead"
              >
                <h6 class="text-uppercase fw-bold mb-4">معلومات التواصل</h6>
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
