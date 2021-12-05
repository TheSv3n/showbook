import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listCastMembers } from "../actions/castMemberActions";
import Loader from "./Loader";
import DirectorListItem from "./DirectorListItem";

const FindDirectorModal = ({
  showModal,
  updateShowModal,
  setDirectorName,
  setDirectorId,
}) => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const castMemberList = useSelector((state) => state.castMemberList);
  const { loading, castMembers, page, feedFinished, count } = castMemberList;

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword !== "") {
      dispatch(listCastMembers(1, searchKeyword, false, "director"));
    }
  };
  return (
    <div
      className={`${showModal ? "modal-overlay show-modal" : "modal-overlay"}`}
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
                {castMembers &&
                  castMembers.map((castMember) => {
                    return (
                      <DirectorListItem
                        key={castMember._id}
                        director={castMember}
                        setDirectorId={setDirectorId}
                        setDirectorName={setDirectorName}
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

export default FindDirectorModal;
