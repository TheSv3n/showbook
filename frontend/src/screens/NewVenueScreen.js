import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import axios from "axios";
import { createVenue } from "../actions/venueActions";
import { VENUE_CREATE_RESET } from "../constants/venueConstants";

const NewVenueScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [venueName, setVenueName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const venueCreate = useSelector((state) => state.venueCreate);
  const { loading, success, venue } = venueCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    if (venueName !== "" && about !== "" && address !== "") {
      dispatch(
        createVenue({
          name: venueName,
          description: about,
          address: address,
          coverImage: image,
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

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (success) {
      dispatch({ type: VENUE_CREATE_RESET });
      history.push(`/venue/${venue._id}`);
    }
  }, [dispatch, history, userInfo, success, venue]);

  return (
    <>
      <section className="text-light">
        <Container>
          <Row className="justify-content-md-center mt-3">
            <Col xs={12} md={9}>
              <h2 className="text-center">Add New Venue</h2>

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Venue name"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="synopsis">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder=""
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="textarea-show"
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

export default NewVenueScreen;
