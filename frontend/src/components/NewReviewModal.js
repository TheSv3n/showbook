import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { addShowReview } from "../actions/showActions";
import { useDispatch } from "react-redux";
import RatingWidget from "./RatingWidget";

const NewReviewModal = ({ showModal, updateShowModal, showId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [performanceId, setPerformanceId] = useState(
    "6123bebf2230d64d5c94d34c" //TODO - update to generate dynamically
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addShowReview(showId, {
        performanceId: performanceId,
        rating: rating,
        comment: comment,
      })
    );
    updateShowModal();
  };
  return (
    <div
      className={`${showModal ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container new-review-container bg-secondary">
        <Container className="form-container">
          <Row className="justify-content-md-center mt-2">
            <Col xs={12} md={8}>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <RatingWidget
                    value={rating}
                    color={"orange"}
                    newReview={true}
                    text={""}
                    setRating={setRating}
                  />
                </Form.Group>

                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="Enter comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className=" my-2">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <Button className="close-modal-btn" onClick={updateShowModal}>
          <i className="bi bi-x-circle-fill"></i>
        </Button>
      </div>
    </div>
  );
};

export default NewReviewModal;
