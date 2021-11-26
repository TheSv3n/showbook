import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listCompanies } from "../actions/companyActions";
import CompanyListItem from "./CompanyListItem";
import Loader from "./Loader";

const FindCompanyModal = ({
  showModal,
  updateShowModal,
  setCompanyName,
  setCompanyId,
}) => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const companyList = useSelector((state) => state.companyList);
  const { loading, companies, page, feedFinished, count } = companyList;

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword !== "") {
      dispatch(listCompanies(1, searchKeyword, false));
    }
  };

  return (
    <div
      className={`${
        showModal
          ? "modal-overlay show-modal performance-modal"
          : "modal-overlay"
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
                {companies &&
                  companies.map((company) => {
                    return (
                      <CompanyListItem
                        key={company._id}
                        company={company}
                        setCompanyId={setCompanyId}
                        setCompanyName={setCompanyName}
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

export default FindCompanyModal;
