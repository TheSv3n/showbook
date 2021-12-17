import React from "react";
import "../css/modal.css";
import ImageCarousel from "./ImageCarousel";

const ImageModal = ({
  images,
  showModal,
  updateShowModal,
  startIndex,
  updateStartIndex,
}) => {
  return (
    <div
      className={`${showModal ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container bg-secondary">
        <div>{images.length !== 0 && images[startIndex].comment}</div>
        <ImageCarousel
          images={images}
          show={1}
          startIndex={startIndex}
          updateShowModal={updateShowModal}
          updateStartIndex={updateStartIndex}
        />
        <button className="close-modal-btn" onClick={updateShowModal}>
          <i className="bi bi-x-circle-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
