import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const FeedShowCard = ({ show }) => {
  return (
    <div className="col-md-3 col-sm">
      <div className="card bg-light h-100">
        <div className="card-body text-center">
          <Link to={`/show/${show._id}`} style={{ textDecoration: "none" }}>
            <Image src={show.coverImage} alt={show.title} fluid></Image>
          </Link>
          <h3 className="card-title mb-3">{show.title}</h3>
          <h4 className="card-title mb-3">By {show.company}</h4>
          <p className="card-text">{show.synopsis}</p>
        </div>
        <div className="card-footer text-center">
          <Link to={`/show/${show._id}`} style={{ textDecoration: "none" }}>
            <i className="bi bi-globe text-dark mx-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeedShowCard;
