import React, { Component } from "react";
import Slider from "react-slick";

export default class CenterMode extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500
    };
    return (
      <div>
        <h2>Center Mode</h2>
        <Slider {...settings}>
          <div>
            <img src="./imgs/cover.jpg" alt="" />
          </div>
          <div>
          <img src="./imgs/cover.jpg" alt="" />
          </div>
          <div>
          <img src="./imgs/cover.jpg" alt="" />
          </div>
          <div>
          <img src="./imgs/cover.jpg" alt="" />
          </div>
          <div>
          <img src="./imgs/cover.jpg" alt="" />
          </div>
          <div>
          <img src="./imgs/cover.jpg" alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}