import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import "../css/review.css";
import RatingWidget from "../components/RatingWidget";

const ReviewElement = ({ review }) => {
  const [userName, setUserName] = useState("");

  const getUserName = async (userId) => {
    const { data: userName } = await axios.get(`/api/users/${userId}/username`);
    setUserName(userName);
  };

  useEffect(() => {
    getUserName(review.user);
  }, [review]);

  return (
    <li className="list-group-item review-card bg-secondary my-2">
      <div className="d-flex">
        <Col md={6}>
          <div className="user">{userName}</div>
        </Col>
        <Col md={6}>
          <div className="rating">
            <RatingWidget value={review.rating} text={""} color={"orange"} />
          </div>
        </Col>
      </div>
      <div className="text-light">{review.comment} </div>
    </li>
  );
};

export default ReviewElement;
