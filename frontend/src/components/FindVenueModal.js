import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listVenues } from "../actions/venueActions";
import VenueListItem from "./VenueListItem";
import Loader from "./Loader";

const FindVenueModal = ({
  showModal,
  updateShowModal,
  setVenueName,
  setVenueId,
}) => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const venueList = useSelector((state) => state.venueList);
  const { loading, venues, page, feedFinished, count } = venueList;

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword !== "") {
      dispatch(listVenues(1, searchKeyword, false));
    }
  };

  return (
    <div
      className={`${
        showModal ? "modal-overlay show-modal top-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container new-review-container bg-secondary text-light">
        <button className="close-modal-btn" onClick={updateShowModal}>
          <i className="bi bi-x-circle-fill"></i>
        </button>

        <Container className="form-container">
          <Row className="justify-content-md-center mt-2">
            <Col xs={12} md={8}>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="comment" as={Row}>
                  <Form.Label column sm="2">
                    Search
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      placeholder="Enter search"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    ></Form.Control>
                  </Col>
                  <Col sm={2}>
                    <Button type="submit" variant="primary" className=" my-2">
                      Submit
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            {loading ? (
              <Loader />
            ) : (
              <ul>
                {venues &&
                  venues.map((venue) => {
                    return (
                      <VenueListItem
                        key={venue._id}
                        venue={venue}
                        setVenueId={setVenueId}
                        setVenueName={setVenueName}
                        updateShowModal={updateShowModal}
                      />
                    );
                  })}
              </ul>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default FindVenueModal;
