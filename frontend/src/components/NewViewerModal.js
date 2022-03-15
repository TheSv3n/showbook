import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import PerformanceModal from "./PerformanceModal";
import { addShowViewer } from "../actions/showActions";
import { useDispatch } from "react-redux";

const NewViewerModal = ({
  showModal,
  updateShowModal,
  performances,
  showId,
}) => {
  const dispatch = useDispatch();
  const [viewed, setViewed] = useState(false);
  const [performanceId, setPerformanceId] = useState("");
  const [performanceText, setPerformanceText] = useState("Not selected");
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const handleClose = () => {
    updateShowModal();
    setViewed(false);
    setPerformanceId("");
    setPerformanceText("Not selected");
  };

  const toggleViewed = () => {
    setViewed(!viewed);
  };

  const handlePerformanceModal = () => {
    setShowPerformanceModal(!showPerformanceModal);
  };

  const handleUpdatePerformance = (id, text) => {
    setPerformanceId(id);
    setPerformanceText(text);
    handlePerformanceModal();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addShowViewer(showId, { seen: viewed, performanceId: performanceId })
    );
    handleClose();
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
        <div className="modal-container new-review-container med-container bg-secondary text-light">
          <Container className="form-container my-3">
            <Form onSubmit={submitHandler}>
              <Row className="justify-content-sm-center">
                <Col sm={3}>
                  <Form.Label>Have you booked/seen this show?</Form.Label>
                </Col>
                <Col sm={3}>
                  <Form.Check
                    id="switchViewed"
                    type="switch"
                    checked={viewed}
                    onChange={toggleViewed}
                  />
                </Col>
              </Row>
              {viewed && (
                <>
                  <Row className="justify-content-sm-center">
                    <Col sm={3}>
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
                    </Col>
                  </Row>
                </>
              )}
              <Row className="justify-content-sm-center">
                <Col sm={2} className="justify-content-sm-center">
                  <Button type="submit" variant="warning" className="my-2">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
          <button className="close-modal-btn" onClick={handleClose}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default NewViewerModal;
