import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container, NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FindCompanyModal from "../components/FindCompanyModal";
import FindDirectorModal from "../components/FindDirectorModal";
import { COMPANY_LIST_RESET } from "../constants/companyConstants";
import { CAST_MEMBER_LIST_RESET } from "../constants/castMemberConstants";
import { createShow } from "../actions/showActions";

const NewShowScreen = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("None Selected");
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [directorId, setDirectorId] = useState("");
  const [directorName, setDirectorName] = useState("None Selected");
  const [showDirectorModal, setShowDirectorModal] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      title !== "" &&
      synopsis !== "" &&
      companyId !== "" &&
      directorId !== ""
    ) {
      dispatch(
        createShow({
          title: title,
          synopsis: synopsis,
          company: companyId,
          director: directorId,
        })
      );
    }
  };

  const showCreate = useSelector((state) => state.showCreate);
  const { loading } = showCreate;

  const updateShowCompanyModal = () => {
    dispatch({ type: COMPANY_LIST_RESET });
    setShowCompanyModal(!showCompanyModal);
  };

  const updateShowDirectorModal = () => {
    dispatch({ type: CAST_MEMBER_LIST_RESET });
    setShowDirectorModal(!showDirectorModal);
  };

  return (
    <>
      <FindCompanyModal
        showModal={showCompanyModal}
        updateShowModal={updateShowCompanyModal}
        setCompanyName={setCompanyName}
        setCompanyId={setCompanyId}
      />
      <FindDirectorModal
        showModal={showDirectorModal}
        updateShowModal={updateShowDirectorModal}
        setDirectorName={setDirectorName}
        setDirectorId={setDirectorId}
      />
      <section className="text-light">
        <Container>
          <Row className="justify-content-md-center mt-3">
            <Col xs={12} md={9}>
              <h2 className="text-center">Add New Show</h2>

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Show name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Row className="mt-3">
                  <Col xs={6}>
                    <Form.Group controlId="company">
                      <Form.Label>Company</Form.Label>
                      <Row className="align-items-center">
                        <Col sm={8}>{companyName}</Col>
                        <Col sm={4}>
                          <Button
                            variant="primary"
                            className="my-2"
                            onClick={updateShowCompanyModal}
                          >
                            Change
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="director">
                      <Form.Label>Director</Form.Label>
                      <Row className="align-items-center">
                        <Col sm={8}>{directorName}</Col>
                        <Col sm={4}>
                          <Button
                            variant="primary"
                            className="my-2"
                            onClick={updateShowDirectorModal}
                          >
                            Change
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="synopsis">
                  <Form.Label>Synopsis</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder=""
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    className="textarea-show"
                  ></Form.Control>
                </Form.Group>
                {loading ? (
                  <Loader />
                ) : (
                  <Button type="submit" variant="primary" className="my-2">
                    Submit
                  </Button>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NewShowScreen;
