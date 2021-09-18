import React from "react";
import PropTypes from "prop-types";

const RatingWidget = ({ value, text, color, newReview, setRating }) => {
  return (
    <>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? "bi bi-star-fill"
              : value >= 0.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          onClick={() => (newReview ? setRating(1) : "")}
        >
          {" "}
        </i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? "bi bi-star-fill"
              : value >= 1.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          onClick={() => (newReview ? setRating(2) : "")}
        >
          {" "}
        </i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? "bi bi-star-fill"
              : value >= 2.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          onClick={() => (newReview ? setRating(3) : "")}
        >
          {" "}
        </i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? "bi bi-star-fill"
              : value >= 3.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          onClick={() => (newReview ? setRating(4) : "")}
        >
          {" "}
        </i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? "bi bi-star-fill"
              : value >= 4.5
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          onClick={() => (newReview ? setRating(5) : "")}
        >
          {" "}
        </i>
      </span>
      <span>{text && text}</span>
    </>
  );
};

RatingWidget.defaultProps = { color: "black" };

RatingWidget.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default RatingWidget;
