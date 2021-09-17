import React from "react";

const NewReviewModal = ({ showModal, updateShowModal }) => {
  return (
    <div
      className={`${showModal ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container bg-secondary">
        New Review
        <button className="close-modal-btn" onClick={updateShowModal}>
          <i className="bi bi-x-circle-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default NewReviewModal;
