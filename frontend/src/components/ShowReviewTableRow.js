import React from "react";
import { Image, Col } from "react-bootstrap";
import RatingWidget from "./RatingWidget";
import { Link } from "react-router-dom";

const ShowReviewTableRow = ({ review }) => {
  return (
    <tr>
      <td className="text-light">
        {" "}
        <Link to={`/show/${review.showId}`} className="link text-light">
          <Col sm={9}>
            <Image
              src={review.poster}
              alt={review.title}
              fluid
              className="list-image"
            ></Image>
          </Col>
        </Link>
      </td>
      <td className="text-light">
        <Link to={`/show/${review.showId}`} className="link text-light">
          {review.title}
        </Link>
      </td>
      <td className="text-light">
        <Link to={`/company/${review.companyId}`} className="link text-light">
          {review.companyName}
        </Link>
      </td>
      <td className="text-light">
        <RatingWidget value={review.rating} text={""} color={"orange"} />
      </td>
      <td className="text-light">
        <Link
          to={`/venue/${review.performanceVenueId}`}
          className="link text-light"
        >
          {review.performanceVenueName}
        </Link>
      </td>
      <td className="text-light">{review.performanceDate.substring(0, 10)}</td>
      <td className="text-light">{review.reviewDate.substring(0, 10)}</td>
      <td className="text-light">
        <Link to={`/showreview/${review.reviewId}`}>View</Link>
      </td>
    </tr>
  );
};

export default ShowReviewTableRow;
