import React from "react";
import { Link } from "react-router-dom";
import { Image, Col, Card } from "react-bootstrap";
import RatingWidget from "./RatingWidget";

const FeedCompanyCard = ({ company }) => {
  return (
    <Col md={3}>
      <Card className="bg-light h-100">
        <Card.Body className="text-center">
          <Link
            to={`/company/${company._id}`}
            style={{ textDecoration: "none" }}
          >
            <Image src={company.coverImage} alt={company.name} fluid></Image>
          </Link>
          <h3 className="card-title mb-3">{company.name}</h3>
          <p className="card-text">{company.description}</p>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FeedCompanyCard;
