import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Col, Card } from "react-bootstrap";
import axios from "axios";
import RatingWidget from "./RatingWidget";

const FeedShowCard = ({ show }) => {
  const [companyName, setCompanyName] = useState("");

  const getCompanyName = async (companyId) => {
    const { data: name } = await axios.get(`/api/companies/${companyId}/name`);
    setCompanyName(name);
  };

  useEffect(() => {
    getCompanyName(show.company);
  }, [show]);
  return (
    <Col md={3}>
      <Card className="bg-light h-100">
        <Card.Body className="text-center">
          <Link to={`/show/${show._id}`} style={{ textDecoration: "none" }}>
            <Image src={show.coverImage} alt={show.title} fluid></Image>
          </Link>
          <h3 className="card-title mb-3">{show.title}</h3>
          <h4 className="card-title mb-3">By {companyName}</h4>
          <p className="card-text">{show.synopsis}</p>
        </Card.Body>
        <Card.Footer>
          <span className="mx-auto">
            <i className="bi bi-calendar-date-fill text-dark mx-1"></i>
            {show.performances.length}
          </span>
          <span className="mx-auto">
            <i className="bi bi-pencil-fill text-dark mx-1"></i>
            {show.reviews.length}
          </span>
          <span className="mx-2">
            <RatingWidget value={show.rating} text={""} />
          </span>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default FeedShowCard;
