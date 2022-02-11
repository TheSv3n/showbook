import React from "react";
import { Image } from "react-bootstrap";
import RatingWidget from "./RatingWidget";
import { Link } from "react-router-dom";

const VenueReviewTableRow = ({ review }) => {
  return (
    <tr>
      <td className="text-light">
        {" "}
        <Link to={`/venue/${review.venueId}`} className="link text-light">
          <Image
            src={review.image}
            alt={review.name}
            fluid
            className="list-image"
          ></Image>
        </Link>
      </td>
      <td className="text-light">
        <Link to={`/venue/${review.venueId}`} className="link text-light">
          {review.name}
        </Link>
      </td>

      <td className="text-light">
        <RatingWidget value={review.rating} text={""} color={"orange"} />
      </td>

      <td className="text-light">
        <Link to={`/venuereview/${review.reviewId}`}>View</Link>
      </td>
    </tr>
  );
};

export default VenueReviewTableRow;
