import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import axios from "axios";
import FindCompanyModal from "../components/FindCompanyModal";
import { COMPANY_LIST_RESET } from "../constants/companyConstants";
import { CAST_MEMBER_CREATE_RESET } from "../constants/castMemberConstants";
import { createCastMember } from "../actions/castMemberActions";

const NewCastMemberScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("None Selected");
  const [position, setPosition] = useState("actor");
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const castMemberCreate = useSelector((state) => state.castMemberCreate);
  const { loading, success, castMember } = castMemberCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    if (name !== "" && about !== "" && position !== "") {
      dispatch(
        createCastMember({
          name: name,
          about: about,
          position: position,
          coverImage: image,
          company: companyId,
        })
      );
    }
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

  const updateShowCompanyModal = () => {
    dispatch({ type: COMPANY_LIST_RESET });
    setShowCompanyModal(!showCompanyModal);
  };

  const updatePosition = (option) => {
    setPosition(option);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (success) {
      dispatch({ type: CAST_MEMBER_CREATE_RESET });
      history.push(`/castmember/${castMember._id}`);
    }
  }, [dispatch, history, userInfo, success, castMember]);

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
              <h2 className="text-center">Add New Cast Member</h2>

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
                </Row>

                <Form.Group controlId="synopsis">
                  <Form.Label>About</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder=""
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea-show"
                  ></Form.Control>

                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => {
                      updatePosition(e.target.value);
                    }}
                  >
                    <option value={"actor"}>Actor</option>
                    <option value={"director"}>Director</option>
                  </Form.Control>
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

export default NewCastMemberScreen;
