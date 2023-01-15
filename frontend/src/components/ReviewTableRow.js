import React from "react";
import { Image, Col } from "react-bootstrap";
import RatingWidget from "./RatingWidget";
import { Link } from "react-router-dom";

const ReviewTableRow = ({ review, type }) => {
  const id = review.showId || review.venueId || review.companyId;
  const image = review.poster || review.image;
  const name = review.name || review.title;
  return (
    <tr>
      <td className="text-light">
        {" "}
        <Link
          to={`/${type === "view" ? "show" : type}/${id}`}
          className="link text-light"
        >
          <Col sm={type === "show" ? 9 : type === "view" ? 6 : 4}>
            <Image
              src={image}
              alt={review.name}
              fluid
              className="list-image"
            ></Image>
          </Col>
        </Link>
      </td>
      <td className="text-light">
        <Link
          to={`/${type === "view" ? "show" : type}/${id}`}
          className="link text-light"
        >
          {name}
        </Link>
      </td>
      {type === "show" && (
        <td className="text-light">
          <Link to={`/company/${review.companyId}`} className="link text-light">
            {review.companyName}
          </Link>
        </td>
      )}

      {type !== "view" && (
        <td className="text-light">
          <RatingWidget value={review.rating} text={""} color={"orange"} />
        </td>
      )}

      {type === "show" || "view" ? (
        <>
          <td className="text-light">
            <Link
              to={`/venue/${review.performanceVenueId}`}
              className="link text-light"
            >
              {review.performanceVenueName}
            </Link>
          </td>
          <td className="text-light">
            {review.performanceDate && review.performanceDate.substring(0, 10)}
          </td>
          {type === "show" && (
            <td className="text-light">{review.reviewDate.substring(0, 10)}</td>
          )}
        </>
      ) : (
        ""
      )}
      {type !== "view" ? (
        <td className="text-light">
          <Link to={`/${type}review/${review.reviewId}`}>View</Link>
        </td>
      ) : (
        <td className="text-danger link">Delete</td>
      )}
    </tr>
  );
};

export default ReviewTableRow;
