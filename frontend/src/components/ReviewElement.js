import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";

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
    <li className="list-group-item review-card my-2">
      <div className="ml-auto">{review.comment} </div>
      <div className="mr-auto">{userName}</div>
    </li>
  );
};

export default ReviewElement;