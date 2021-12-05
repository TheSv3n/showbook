import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import FindVenueModal from "./FindVenueModal";
import { addShowPerformance } from "../actions/showActions";

const NewPerformanceModal = ({ showModal, updateShowModal }) => {
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [venueId, setVenueId] = useState("");
  const [venueText, setVenueText] = useState("Not selected");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const updateVenueModal = () => {
    setShowVenueModal(!showVenueModal);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (venueId !== "" && date !== "" && time !== "") {
    }
  };
  return (
    <>
      <FindVenueModal
        showModal={showVenueModal}
        updateShowModal={updateVenueModal}
        setVenueName={setVenueText}
        setVenueId={setVenueId}
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
                  <Form.Group controlId="venue">
                    <Form.Label>
                      Venue - <span>{venueText}</span> -{" "}
                      <span
                        className="text-dark link"
                        onClick={updateVenueModal}
                      >
                        select
                      </span>{" "}
                    </Form.Label>
                  </Form.Group>

                  <Row>
                    <Form.Label className="col-1">Date</Form.Label>
                    <Form.Group controlId="date" className="col-4">
                      <Form.Control
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />{" "}
                    </Form.Group>

                    <Form.Label className="col-1">Time</Form.Label>
                    <Form.Group controlId="time" className="col-4">
                      <Form.Control
                        type="time"
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />{" "}
                    </Form.Group>
                  </Row>

                  {venueId === "" ? (
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
          <button className="close-modal-btn" onClick={updateShowModal}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default NewPerformanceModal;
