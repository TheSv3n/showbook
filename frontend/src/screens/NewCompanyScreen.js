import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { createCompany } from "../actions/companyActions";
import { COMPANY_CREATE_RESET } from "../constants/companyConstants";

const NewCompanyScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [headquarters, setHeadQuarters] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const companyCreate = useSelector((state) => state.companyCreate);
  const { loading, success, company } = companyCreate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
      setImageName(e.target.value);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const clearImageHandler = () => {
    document.getElementById("image-form").value = "";
    setImageName("No Image");
    setImage("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name !== "" && about !== "" && headquarters !== "") {
      dispatch(
        createCompany({
          name: name,
          description: about,
          headquarters: headquarters,
          coverImage: image,
        })
      );
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (success) {
      dispatch({ type: COMPANY_CREATE_RESET });
      navigate(`/company/${company._id}`);
    }
  }, [dispatch, navigate, userInfo, success, company]);

  return (
    <>
      <section className="text-light">
        <Container>
          <Row className="justify-content-md-center mt-3">
            <Col xs={12} md={9}>
              <h2 className="text-center">Add New Company</h2>

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Company name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="synopsis">
                  <Form.Label>About</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder=""
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea-show"
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="synopsis">
                  <Form.Label>Headquarters (Address)</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder=""
                    value={headquarters}
                    onChange={(e) => setHeadQuarters(e.target.value)}
                    className="textarea-show"
                  ></Form.Control>
                </Form.Group>

                <Row className="my-2">
                  <Form.Group className="input-group">
                    <Col sm={2}>
                      <Form.Label id="image-label" for="image-form">
                        Add Image
                      </Form.Label>
                      <input
                        id="image-form"
                        type="file"
                        className="form-file"
                        onChange={uploadFileHandler}
                      />
                    </Col>
                    <Col sm={10}>
                      {uploading ? (
                        <Loader />
                      ) : (
                        <div className="d-flex my-auto">
                          <div className="d-none d-md-flex d-lg-flex">
                            {imageName}
                          </div>
                          {image === "" ? (
                            ""
                          ) : (
                            <Button
                              variant="primary"
                              className="my-2"
                              onClick={clearImageHandler}
                            >
                              Clear
                            </Button>
                          )}
                        </div>
                      )}
                    </Col>
                  </Form.Group>
                </Row>
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

export default NewCompanyScreen;
