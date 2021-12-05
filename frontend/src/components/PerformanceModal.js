import React from "react";
import PerformanceListItem from "./PerformanceListItem";
import VenuePerformanceListItem from "./VenuePerformanceListItem";

const PerformanceModal = ({
  showModal,
  updateShowModal,
  handleUpdatePerformance,
  performances,
  venuePerformance,
  fromReview,
}) => {
  return (
    <div
      className={`${
        showModal ? "modal-overlay show-modal top-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container new-review-container bg-secondary">
        <button className="close-modal-btn" onClick={updateShowModal}>
          <i className="bi bi-x-circle-fill"></i>
        </button>
        <ul>
          {performances &&
            performances.map((performance) => {
              return (
                <>
                  {venuePerformance ? (
                    <VenuePerformanceListItem
                      key={performance.id}
                      performance={performance}
                      handleUpdatePerformance={handleUpdatePerformance}
                    />
                  ) : (
                    <PerformanceListItem
                      key={performance.id}
                      performance={performance}
                      handleUpdatePerformance={handleUpdatePerformance}
                      fromReview={fromReview}
                    />
                  )}
                </>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default PerformanceModal;
