import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { Link } from "react-router-dom";

import LeftArrow from "../assets/left-arrow.svg";
import RightArrow from "../assets/right-arrow.svg";

export default function Card({ title, data }) {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );
  let slides = 0;
  if (matches) {
    slides = 4;
  } else {
    slides = 2;
  }

  const settings = {
    className: "slider variable-width",
    dots: false,
    speed: 2000,
    autoplay: true,
    slidesToShow: slides,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    // variableWidth: true,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };
  return (
    <div className="card__container">
      <h1>
        {" "}
        <div class="separator">{title}</div>
      </h1>
      <Slider {...settings} className="card__container--inner">
        {data.map((item, index) => {
          return (
            <>
              <div className="card__container--inner--card" key={index}>
                <Link
                  to="/markets"
                  // state={{ product: product, var: productVar }}
                >
                  <img
                    src={item.url}
                    alt="hero_img"
                    style={{ height: "200px", "border-radius": "50%" }}
                  />
                </Link>
              </div>
            </>
          );
        })}
      </Slider>
    </div>
  );
}
