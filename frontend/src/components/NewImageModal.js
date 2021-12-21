import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import axios from "axios";
import { createShowImage } from "../actions/showActions";
import { createVenueImage } from "../actions/venueActions";
import { SHOW_ADD_IMAGE_RESET } from "../constants/showConstants";
import { VENUE_ADD_IMAGE_RESET } from "../constants/venueConstants";
import PerformanceModal from "./PerformanceModal";

const NewImageModal = ({
  id,
  showModal,
  updateShowModal,
  performances,
  type,
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [comment, setComment] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");
  const [performanceId, setPerformanceId] = useState();
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [performanceText, setPerformanceText] = useState("Not selected");

  const addShowImage = useSelector((state) => state.addShowImage);
  const { loading, success } = addShowImage;

  const addVenueImage = useSelector((state) => state.addVenueImage);
  const { loading: loadingVenue, success: successVenue } = addVenueImage;

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
    if (type === "show") {
      if (image !== "" && imageName !== "No Image") {
        dispatch(
          createShowImage(id, {
            image: image,
            comment: comment,
            performance: performanceId,
          })
        );
      }
    }
    if (type === "venue") {
      if (image !== "" && imageName !== "No Image") {
        dispatch(
          createVenueImage(id, {
            image: image,
            comment: comment,
          })
        );
      }
    }
  };

  const clearForm = () => {
    setComment("");
    setPerformanceId();
    setPerformanceText("Not selected");
  };

  const handlePerformanceModal = () => {
    setShowPerformanceModal(!showPerformanceModal);
  };

  const handleUpdatePerformance = (id, text) => {
    setPerformanceId(id);
    setPerformanceText(text);
    handlePerformanceModal();
  };

  useEffect(() => {
    if (success || successVenue) {
      dispatch({ type: SHOW_ADD_IMAGE_RESET });
      dispatch({ type: VENUE_ADD_IMAGE_RESET });
      updateShowModal();
      clearImageHandler();
      clearForm();
    }
  }, [dispatch, success, updateShowModal]);

  return (
    <>
      <PerformanceModal
        showModal={showPerformanceModal}
        updateShowModal={handlePerformanceModal}
        handleUpdatePerformance={handleUpdatePerformance}
        performances={performances}
        fromReview={true}
      />
      <div
        className={`${
          showModal ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="modal-container new-review-container bg-secondary text-light">
          <Container className="form-container">
            <Row className="justify-content-md-center mt-3">
              <Form onSubmit={submitHandler}>
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
                {type === "show" ? (
                  <Form.Group controlId="performance">
                    <Form.Label>
                      Performance - <span>{performanceText}</span> -{" "}
                      <span
                        className="text-dark link"
                        onClick={handlePerformanceModal}
                      >
                        select
                      </span>{" "}
                    </Form.Label>
                  </Form.Group>
                ) : (
                  ""
                )}

                <Row>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Enter comment"
                      value={comment}
                      className="image-comment-area"
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Row>

                <Row>
                  {loading || loadingVenue ? (
                    <Loader />
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      className="my-2 col-4 mx-auto"
                    >
                      Submit
                    </Button>
                  )}
                </Row>
              </Form>
            </Row>
          </Container>
          <button
            className="close-modal-btn"
            onClick={() => {
              updateShowModal();
              clearImageHandler();
            }}
          >
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default NewImageModal;
