import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container, NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";

const NewShowScreen = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const submitHandler = () => {};

  return (
    <section className="text-light">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={9}>
            <h2 className="text-center">Add New Show</h2>

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Show name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
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
  );
};

export default NewShowScreen;
