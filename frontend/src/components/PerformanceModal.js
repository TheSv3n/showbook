import React from "react";
import PerformanceListItem from "./PerformanceListItem";

const PerformanceModal = ({
  showModal,
  updateShowModal,
  updatePerformanceId,
  performances,
}) => {
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
        <>
          {performances &&
            performances.map((performance) => {
              return (
                <PerformanceListItem
                  key={performance.id}
                  performance={performance}
                />
              );
            })}
        </>
      </div>
    </div>
  );
};

export default PerformanceModal;
