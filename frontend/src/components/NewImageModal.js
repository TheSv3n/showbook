import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import axios from "axios";
import { addImage } from "../actions/showActions";
import { SHOW_ADD_IMAGE_RESET } from "../constants/showConstants";

const NewImageModal = ({ showId, showModal, updateShowModal }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("No Image");

  const addShowImage = useSelector((state) => state.addShowImage);
  const { loading, success } = addShowImage;

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
    if (image !== "" && imageName !== "No Image") {
      dispatch(
        addImage(showId, {
          image: image,
        })
      );
    }
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: SHOW_ADD_IMAGE_RESET });
      updateShowModal();
      clearImageHandler();
    }
  }, [dispatch, success]);

  return (
    <>
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
                  <Row>
                    {loading ? (
                      <Loader />
                    ) : (
                      <Button type="submit" variant="primary" className="my-2">
                        Submit
                      </Button>
                    )}
                  </Row>
                </Form.Group>
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
