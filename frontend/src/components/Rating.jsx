import React from "react";

function Rating({ value, text, Color }) {
  return (
    <div className="rating">
      <i
        style={{ color: Color }}
        className={
          value >= 1
            ? "fa-solid fa-star"
            : value == 0.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star"
        }
      ></i>
      <i
        style={{ color: Color }}
        className={
          value >= 2
            ? "fa-solid fa-star"
            : value == 1.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star"
        }
      ></i>
      <i
        style={{ color: Color }}
        className={
          value >= 3
            ? "fa-solid fa-star"
            : value == 2.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star"
        }
      ></i>
      <i
        style={{ color: Color }}
        className={
          value >= 4
            ? "fa-solid fa-star"
            : value == 3.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star"
        }
      ></i>
      <i
        style={{ color: Color }}
        className={
          value == 5
            ? "fa-solid fa-star"
            : value == 4.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star"
        }
      ></i>{" "}
      {text && "from " + text}
    </div>
  );
}

export default Rating;
