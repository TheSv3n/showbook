import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/review.css";
import RatingWidget from "../components/RatingWidget";

const Review = ({ review, performances, type }) => {
  const [userName, setUserName] = useState("");
  const [performanceDate, setPerformanceDate] = useState("");
  const [performanceVenue, setPerformanceVenue] = useState("");
  const [showEditFields, setShowEditFields] = useState("");
  const [editedComment, setEditedComment] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const editHandler = () => {
    setShowEditFields(!showEditFields);
    setEditedComment(review.comment);
  };

  const deleteHandler = () => {
    //TODO
  };

  const submitHandler = () => {
    //TODO
    setShowEditFields(!showEditFields);
  };

  useEffect(() => {
    getUserName(review.user);
    if (type === "show") {
      getPerformanceInfo();
    }
  }, [review]);

  return (
    <li className="list-group-item review-card bg-secondary my-2">
      <div className="d-flex">
        <Col md={6}>
          <Link to={`/user/${review.user}`}>
            <div className="user">{userName}</div>
          </Link>
        </Col>
        {type === "showcomment" ? (
          ""
        ) : (
          <Col md={6}>
            <div className="align-right">
              <RatingWidget value={review.rating} text={""} color={"orange"} />
            </div>
          </Col>
        )}
      </div>
      {type === "show" ? (
        <div className="performance">
          Seen at: {performanceVenue} on {performanceDate}
        </div>
      ) : (
        <></>
      )}

      {showEditFields ? (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="comment">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter comment"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Submit
          </Button>
          <Button variant="danger" className="my-2 mx-2" onClick={editHandler}>
            Cancel
          </Button>
        </Form>
      ) : (
        <>
          <div className="text-light">{review.comment} </div>
          <div className="d-flex justify-content-between">
            <span className="align-right">
              {userInfo && userInfo._id === review.user ? (
                <>
                  <i
                    className="bi bi-pencil-square text-light review-icon mx-1"
                    onClick={editHandler}
                  ></i>
                  <i
                    className="bi bi-trash text-light review-icon mx-1"
                    onClick={deleteHandler}
                  ></i>
                </>
              ) : (
                ""
              )}
            </span>
            {type === "showcomment" ? (
              ""
            ) : (
              <Link to={`/showreview/${review._id}`} className="text-white">
                <span className="align-left">Show full review</span>
              </Link>
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default Review;
