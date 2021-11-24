import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container, NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FindCompanyModal from "../components/FindCompanyModal";
import { COMPANY_LIST_RESET } from "../constants/companyConstants";

const NewShowScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("None Selected");
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  const submitHandler = () => {};

  const updateShowCompanyModal = () => {
    dispatch({ type: COMPANY_LIST_RESET });
    setShowCompanyModal(!showCompanyModal);
  };

  return (
    <>
      <FindCompanyModal
        showModal={showCompanyModal}
        updateShowModal={updateShowCompanyModal}
        setCompanyName={setCompanyName}
        setCompanyId={setCompanyId}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="company">
                  <Form.Label>Company</Form.Label>
                  <Row className="align-items-center">
                    <Col sm={4}>{companyName}</Col>
                    <Col sm={2}>
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

                <Form.Group controlId="synopsis">
                  <Form.Label>Synopsis</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder=""
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea-show"
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="my-2">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NewShowScreen;
