import React from "react";
import { Link } from "react-router-dom";
import { Image, Col, Card } from "react-bootstrap";
import RatingWidget from "./RatingWidget";

const FeedCastMemberCard = ({ castMember }) => {
  return (
    <Col md={3}>
      <Card className="bg-light h-100">
        <Card.Body className="text-center">
          <Link
            to={`/castmember/${castMember._id}`}
            style={{ textDecoration: "none" }}
          >
            <Image
              src={castMember.coverImage}
              alt={castMember.name}
              fluid
            ></Image>
          </Link>
          <h3 className="card-title mb-3">{castMember.name}</h3>
          <p className="card-text">{castMember.description}</p>
        </Card.Body>
        <Card.Footer>
          <span className="mx-auto">
            <i className="bi bi-pencil-fill text-dark mx-1"></i>
            {castMember.reviews.length}
          </span>
          <span className="mx-2">
            <RatingWidget
              value={castMember.rating}
              text={""}
              color={"orange"}
            />
          </span>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default FeedCastMemberCard;
