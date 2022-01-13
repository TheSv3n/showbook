import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_ADD_ROLE_RESET } from "../constants/showConstants";
import FindCastMemberModal from "./FindCastMemberModal";
import { CAST_MEMBER_LIST_RESET } from "../constants/castMemberConstants";
import { createShowRole } from "../actions/showActions";

const NewRoleModal = ({ showId, showModal, updateShowModal }) => {
  const dispatch = useDispatch();
  const [castMemberId, setCastMemberId] = useState("");
  const [castMemberName, setCastMemberName] = useState("Not Selected");
  const [role, setRole] = useState("");
  const [showCastMemberModal, setShowCastMemberModal] = useState(false);

  const addShowRole = useSelector((state) => state.addShowRole);
  const { loading, success } = addShowRole;

  const updateShowCastMemberModal = () => {
    dispatch({ type: CAST_MEMBER_LIST_RESET });
    setShowCastMemberModal(!showCastMemberModal);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createShowRole(showId, {
        castMemberId: castMemberId,
        role: role,
      })
    );
  };

  useEffect(() => {
    if (success) {
      updateShowModal();
      dispatch({ type: SHOW_ADD_ROLE_RESET });
    }
  }, [success]);

  return (
    <>
      <FindCastMemberModal
        showModal={showCastMemberModal}
        updateShowModal={updateShowCastMemberModal}
        setCastMemberName={setCastMemberName}
        setCastMemberId={setCastMemberId}
        type="actor"
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
                  <Row className="align-items-center my-2">
                    <Form.Group controlId="venue">
                      <Form.Label>
                        CastMember - <span>{castMemberName}</span> -{" "}
                        <span
                          className="text-dark link"
                          onClick={updateShowCastMemberModal}
                        >
                          select
                        </span>{" "}
                      </Form.Label>
                    </Form.Group>
                  </Row>

                  <Row className="align-items-center">
                    <Col sm={1}>
                      <Form.Label>Role</Form.Label>
                    </Col>
                    <Col sm={11}>
                      <Form.Group controlId="role">
                        <Form.Control
                          type="text"
                          placeholder="Role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  {castMemberId === "" ? (
                    <div className="my-5" />
                  ) : loading ? (
                    <Loader />
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

export default NewRoleModal;
