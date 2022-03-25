import React from "react";
import { Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteShowViewer } from "../actions/showActions";

const RemoveViewerModal = ({
  showModal,
  updateShowModal,
  viewerId,
  showId,
}) => {
  const submitDelete = () => {
    //TODO
  };

  return (
    <div
      className={`${
        showModal ? "modal-overlay show-modal top-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container new-review-container bg-secondary">
        <div className="text-white mx-auto">
          Are you sure you want to remove this show from your Watchlist?
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

export default RemoveViewerModal;
