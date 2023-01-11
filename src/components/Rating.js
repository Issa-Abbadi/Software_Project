import React, { useState } from "react";
import {
  faStar,
  faStarHalf,
  faStarHalfAlt,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rating = (props) => {
  const [rating, setRating] = useState(0);

  const handleClick = (newRating) => {
    setRating(newRating);
    if (newRating + 1 > 5) {
      props.setNewRating(5);
    } else {
      props.setNewRating(newRating + 1);
    }
  };

  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <>
      {[...Array(5)].map((e, i) => {
        if (rating >= i) {
          return (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              color={"orange"}
              onClick={() => handleClick(i + 0.5)}
            />
          );
        } else if (rating >= i - 0.5) {
          return (
            <FontAwesomeIcon
              key={i}
              icon={faStarHalfAlt}
              color={"orange"}
              onClick={() => handleClick(i + 0.5)}
            />
          );
        } else {
          return <></>;
        }
      })}
    </>
  );
};

export default Rating;
