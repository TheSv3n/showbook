import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container, FormCheck } from "react-bootstrap";
import PerformanceModal from "./PerformanceModal";

const NewViewerModal = ({ showModal, updateShowModal }) => {
  const [viewed, setViewed] = useState(false);
  const handleClose = () => {
    updateShowModal();
  };

  const toggleViewed = () => {
    setViewed(!viewed);
  };

  return (
    <>
      <div
        className={`${
          showModal ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="modal-container new-review-container med-container bg-secondary text-light">
          <Container className="form-container">
            <Form>
              <Row>
                <Col>
                  <Form.Label for={"switch"}>
                    Have you booked/Seen this show?
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Check
                    id="switchViewed"
                    type="switch"
                    checked={viewed}
                    onChange={toggleViewed}
                  />
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
