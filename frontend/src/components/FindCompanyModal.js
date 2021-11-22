import React from "react";

const FindCompanyModal = ({ showModal, updateShowModal }) => {
  return (
    <div
      className={`${
        showModal
          ? "modal-overlay show-modal performance-modal"
          : "modal-overlay"
      }`}
    >
      <div className="modal-container new-review-container bg-secondary">
        <button className="close-modal-btn" onClick={updateShowModal}>
          <i className="bi bi-x-circle-fill"></i>
        </button>
        <ul>
          <li>test</li>
        </ul>
      </div>
    </div>
  );
};

export default FindCompanyModal;
