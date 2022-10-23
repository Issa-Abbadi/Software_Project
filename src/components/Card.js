import React from "react";
import Slider from "react-slick";

import LeftArrow from "../assets/left-arrow.svg";
import RightArrow from "../assets/right-arrow.svg";

export default function Card({ title, data }) {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );
  const settings = {
    dots: false,
    speed: 2000,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
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
                <img
                  src={item.url}
                  alt="hero_img"
                  style={{ height: "200px", "border-radius": "50%" }}
                />
              </div>
            </>
          );
        })}
      </Slider>
    </div>
  );
}
