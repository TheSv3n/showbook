import React from "react";
import ShowListItem from "./ShowListItem";

const ShowModal = ({ showModal, updateShowModal, shows }) => {
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
          {shows &&
            shows.map((show) => {
              return (
                <>
                  <ShowListItem key={show._id} show={show} />
                </>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ShowModal;
