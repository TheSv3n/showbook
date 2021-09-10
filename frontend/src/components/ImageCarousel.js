import React, { useState, useEffect } from "react";
import { Image, Col } from "react-bootstrap";
import "../css/carousel.css";

const ImageCarousel = ({
  images,
  show,
  updateShowModal,
  startIndex,
  updateStartIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(images.length);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleStartIndex = (id) => {
    let tempImages = [...images];
    let index = tempImages.findIndex((image) => {
      return image._id === id.toString();
    });
    updateStartIndex(index);
    updateShowModal();
  };

  useEffect(() => {
    setLength(images.length);
    setCurrentIndex(startIndex);
  }, [images, startIndex]);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {currentIndex > 0 && (
          <button className="left-arrow" onClick={prev}>
            &lt;
          </button>
        )}

        <div className="carousel-content-wrapper">
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
            }}
          >
            {images.map((image) => (
              <div>
                <div
                  style={{ padding: 8 }}
                  className={`${show > 1 ? "thumbnail" : ""}`}
                >
                  <Image
                    src={image.image}
                    alt={image.name}
                    fluid
                    onClick={() => {
                      handleStartIndex(image._id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {currentIndex < length - show && (
          <button onClick={next} className="right-arrow">
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
