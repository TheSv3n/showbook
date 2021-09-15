import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import "../css/review.css";
import RatingWidget from "../components/RatingWidget";

const Review = ({ review, performances }) => {
  const [userName, setUserName] = useState("");
  const [performanceDate, setPerformanceDate] = useState("");
  const [performanceVenue, setPerformanceVenue] = useState("");

  const getUserName = async (userId) => {
    const { data: userName } = await axios.get(`/api/users/${userId}/username`);
    setUserName(userName);
  };

  const getPerformanceInfo = async () => {
    let venueId;
    let performanceDate;

    for (let i = 0; i < performances.length; i++) {
      if (performances[i]._id === review.performanceId) {
        venueId = performances[i].venueId;
        performanceDate = performances[i].date.toString();
      }
    }

    const { data: name } = await axios.get(`/api/venues/${venueId}/name`);
    setPerformanceVenue(name);
    setPerformanceDate(performanceDate.substr(0, 10));
  };

  useEffect(() => {
    getUserName(review.user);
    getPerformanceInfo();
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
      <div className="performance">
        Seen at: {performanceVenue} on {performanceDate}
      </div>
      <div className="text-light">{review.comment} </div>
    </li>
  );
};

export default Review;
