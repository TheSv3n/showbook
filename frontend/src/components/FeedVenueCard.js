import React from "react";
import { Link } from "react-router-dom";
import { Image, Col, Card } from "react-bootstrap";
import RatingWidget from "./RatingWidget";

const FeedVenueCard = ({ venue }) => {
  const truncatedDescription = venue.description.substring(0, 150);
  return (
    <Col md={3}>
      <Card className="bg-light h-100">
        <Card.Body className="text-center">
          <Link to={`/venue/${venue._id}`} style={{ textDecoration: "none" }}>
            <Image
              src={venue.coverImage}
              alt={venue.name}
              fluid
              className="card-image"
            ></Image>
          </Link>
          <h3 className="card-title mb-3">{venue.name}</h3>
          <p className="card-text">{truncatedDescription}...</p>
        </Card.Body>
        <Card.Footer>
          <span className="mx-auto">
            <i className="bi bi-pencil-fill text-dark mx-1"></i>
            {venue.reviews.length}
          </span>
          <span className="mx-2">
            <RatingWidget value={venue.rating} text={""} color={"orange"} />
          </span>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default FeedVenueCard;
