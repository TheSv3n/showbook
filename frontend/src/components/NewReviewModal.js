import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { addShowReview } from "../actions/showActions";
import { addVenueReview } from "../actions/venueActions";
import { useDispatch } from "react-redux";
import RatingWidget from "./RatingWidget";
import PerformanceModal from "./PerformanceModal";

const NewReviewModal = ({
  showModal,
  updateShowModal,
  id,
  performances,
  type,
}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");
  const [performanceId, setPerformanceId] = useState("");
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [performanceText, setPerformanceText] = useState("Not selected");

  const handleClose = () => {
    setRating(0);
    setComment("");
    setPerformanceId("");
    setPerformanceText("Not selected");
    updateShowModal();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    switch (type) {
      case "show":
        dispatch(
          addShowReview(id, {
            performanceId: performanceId,
            rating: rating,
            comment: comment,
          })
        );
        break;
      case "venue":
        dispatch(
          addVenueReview(id, {
            rating: rating,
            comment: comment,
          })
        );
        break;

      default:
    }

    handleClose();
  };

  const handlePerformanceModal = () => {
    setShowPerformanceModal(!showPerformanceModal);
  };

  const handleUpdatePerformance = (id, text) => {
    setPerformanceId(id);
    setPerformanceText(text);
    handlePerformanceModal();
  };

  return (
    <>
      <PerformanceModal
        showModal={showPerformanceModal}
        updateShowModal={handlePerformanceModal}
        handleUpdatePerformance={handleUpdatePerformance}
        performances={performances}
        fromReview={true}
      />
      <div
        className={`${
          showModal ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="modal-container new-review-container bg-secondary text-light">
          <Container className="form-container">
            <Row className="justify-content-md-center mt-2">
              <Col xs={12} md={8}>
                <Form onSubmit={submitHandler}>
                  {type === "show" ? (
                    <Form.Group controlId="performance">
                      <Form.Label>
                        Performance - <span>{performanceText}</span> -{" "}
                        <span
                          className="text-dark link"
                          onClick={handlePerformanceModal}
                        >
                          select
                        </span>{" "}
                      </Form.Label>
                    </Form.Group>
                  ) : (
                    ""
                  )}

                  <Form.Group controlId="rating">
                    <Form.Label>Rating - </Form.Label>
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
                      as="textarea"
                      rows={5}
                      placeholder="Enter comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  {performanceId === "" && type === "show" ? (
                    ""
                  ) : (
                    <Button type="submit" variant="primary" className=" my-2">
                      Submit
                    </Button>
                  )}
                </Form>
              </Col>
            </Row>
          </Container>
          <button className="close-modal-btn" onClick={handleClose}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default NewReviewModal;
