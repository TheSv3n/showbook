import React from "react";
import { Row, Button } from "react-bootstrap";

const DeleteModal = ({ showModal, updateShowModal, submitDelete, type }) => {
  return (
    <div
      className={`${
        showModal ? "modal-overlay show-modal top-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container new-review-container bg-secondary">
        <div className="text-white mx-auto">
          Are you sure you want to delete this {type}?
        </div>
        <Row className="mx-auto">
          <Button
            variant="danger"
            className="my-2 col-5"
            onClick={submitDelete}
          >
            Yes
          </Button>
          <Button
            variant="primary"
            className="my-2 mx-2 col-5"
            onClick={updateShowModal}
          >
            No
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default DeleteModal;
