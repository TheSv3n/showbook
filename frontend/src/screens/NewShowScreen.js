import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import FindCompanyModal from "../components/FindCompanyModal";
import { COMPANY_LIST_RESET } from "../constants/companyConstants";
import { CAST_MEMBER_LIST_RESET } from "../constants/castMemberConstants";
import { createShow } from "../actions/showActions";
import { SHOW_CREATE_RESET } from "../constants/showConstants";
import axios from "axios";
import "../css/NewShowScreen.css";
import FindCastMemberModal from "../components/FindCastMemberModal";

const NewShowScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("None Selected");
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [directorId, setDirectorId] = useState("");
  const [directorName, setDirectorName] = useState("None Selected");
  const [showDirectorModal, setShowDirectorModal] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");

  const submitHandler = (e) => {
    e.preventDefault();
    if (title !== "" && synopsis !== "") {
      dispatch(
        createShow({
          title: title,
          synopsis: synopsis,
          company: companyId,
          director: directorId,
          coverImage: image,
        })
      );
    }
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const showCreate = useSelector((state) => state.showCreate);
  const { loading, success, show } = showCreate;

  const updateShowCompanyModal = () => {
    dispatch({ type: COMPANY_LIST_RESET });
    setShowCompanyModal(!showCompanyModal);
  };

  const updateShowDirectorModal = () => {
    dispatch({ type: CAST_MEMBER_LIST_RESET });
    setShowDirectorModal(!showDirectorModal);
  };

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

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (success) {
      dispatch({ type: SHOW_CREATE_RESET });
      navigate(`/show/${show._id}`);
    }
  }, [dispatch, navigate, userInfo, success, show]);

  return (
    <>
      <FindCompanyModal
        showModal={showCompanyModal}
        updateShowModal={updateShowCompanyModal}
        setCompanyName={setCompanyName}
        setCompanyId={setCompanyId}
      />
      <FindCastMemberModal
        showModal={showDirectorModal}
        updateShowModal={updateShowDirectorModal}
        setCastMemberName={setDirectorName}
        setCastMemberId={setDirectorId}
        type="director"
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
                      <Form.Label>Company (optional)</Form.Label>
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
                      <Form.Label>Director (optional)</Form.Label>
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

export default NewShowScreen;
