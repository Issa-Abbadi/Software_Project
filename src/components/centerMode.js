import React, { Component } from "react";
import Slider from "react-slick";

class CenterMode extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 4,
      speed: 500,
    };
    return (
      <div>
        <h2>Center Mode</h2>
        <Slider {...settings}>
          <div>
            <img src="./imgs/cover.jpg" style={{ height: "100px" }} alt="" />
          </div>
          <div>
            <img src="./imgs/cover.jpg" style={{ height: "100px" }} alt="" />
          </div>
          <div>
            <img src="./imgs/cover.jpg" style={{ height: "100px" }} alt="" />
          </div>
          <div>
            <img src="./imgs/cover.jpg" style={{ height: "100px" }} alt="" />
          </div>
          <div>
            <img src="./imgs/cover.jpg" style={{ height: "100px" }} alt="" />
          </div>
          <div>
            <img src="./imgs/cover.jpg" style={{ height: "100px" }} alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}

export default CenterMode;
