import React from "react";
import { Carousel, Image, Col } from "react-bootstrap";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel className="bg-dark" show={3}>
      {images.map((image) => (
        <Carousel.Item key={image._id}>
          <Image src={image.image} alt={image.name} fluid />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
