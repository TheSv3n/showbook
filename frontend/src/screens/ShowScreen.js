import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowInfo } from "../actions/showActions";
import { Image, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Loader from "../components/Loader";
import RatingWidget from "../components/RatingWidget";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";

const ShowScreen = ({ match }) => {
  const dispatch = useDispatch();
  const showId = match.params.id;

  const [companyName, setCompanyName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const getCompanyName = async (companyId) => {
    const { data: name } = await axios.get(`/api/companies/${companyId}/name`);
    setCompanyName(name);
  };

  const showInfo = useSelector((state) => state.showInfo);
  const { show, loading } = showInfo;

  const updateShowModal = () => {
    setShowModal(!showModal);
  };

  const updateStartIndex = (newIndex) => {
    setStartIndex(newIndex);
  };

  useEffect(() => {
    if (!show || show._id !== showId) {
      dispatch(getShowInfo(showId, false));
    } else {
      getCompanyName(show.company);
    }
  }, [dispatch, showId, show]);
  return (
    <section className="bg-dark p-5 ">
      {loading ? (
        <Loader />
      ) : (
        show && (
          <>
            <ImageModal
              images={show.images}
              showModal={showModal}
              updateShowModal={updateShowModal}
              updateStartIndex={updateStartIndex}
              startIndex={startIndex}
            />
            <Container>
              <Row>
                <h2 className="text-white">{show.title}</h2>
                <h5 className="text-secondary">By {companyName}</h5>
              </Row>
              <Row className="mb-4">
                <Col md={9}>
                  <Image src={show.coverImage} alt={show.title} fluid></Image>
                </Col>
                <Col md={3} className="text-white">
                  <Row>
                    <h5 className="text-secondary">Directed by </h5>
                    <div>{show.director}</div>
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">About </h5>
                    <div>{show.synopsis}</div>
                  </Row>
                  <Row>
                    <h5 className="text-secondary mt-1">Rating </h5>
                    {show.reviews && show.reviews.length > 0 ? (
                      <>
                        <span className="mx-2">
                          <RatingWidget
                            value={show.rating}
                            text={""}
                            color={"white"}
                          />
                        </span>
                        <div>from {show.reviews.length} reviews</div>
                      </>
                    ) : (
                      <div>No Reviews</div>
                    )}
                  </Row>
                </Col>
              </Row>
              <Row>
                <h5 className="text-secondary">Images</h5>
                <ImageCarousel
                  images={show.images}
                  show={4}
                  updateStartIndex={updateStartIndex}
                  updateShowModal={updateShowModal}
                  startIndex={0}
                />
              </Row>
            </Container>
          </>
        )
      )}
    </section>
  );
};

export default ShowScreen;
