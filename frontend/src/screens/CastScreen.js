import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getShowInfo } from "../actions/showActions";
import CastListItem from "../components/CastListItem";
import NewRoleModal from "../components/NewRoleModal";

const CastScreen = ({ match }) => {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [showNewRoleModal, setShowNewRoleModal] = useState(false);
  const showId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const showInfo = useSelector((state) => state.showInfo);
  const { show, loading } = showInfo;

  const updateShowNewRoleModal = () => {
    setShowNewRoleModal(!showNewRoleModal);
  };

  useEffect(() => {
    if (!show || show._id !== showId) {
      dispatch(getShowInfo(showId, false));
    }
  }, [dispatch, showId, show]);

  return (
    <section className="p-5 ">
      {loading ? (
        <Loader />
      ) : (
        show && (
          <>
            <NewRoleModal
              showModal={showNewRoleModal}
              updateShowModal={updateShowNewRoleModal}
              showId={showId}
            />
            <Container>
              <Link to={`/show/${showId}`}>
                <Row className="align-items-center ">
                  <Col sm={1}>
                    <Image src={show.coverImage} alt={show.name} fluid></Image>
                  </Col>
                  <Col sm={7}>
                    <h2 className="text-white">{show.title} - Cast</h2>
                  </Col>
                </Row>
              </Link>
              <Row className="text-white">
                {userInfo ? (
                  <Col sm={1}>
                    <span className="link" onClick={updateShowNewRoleModal}>
                      Add Role
                    </span>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
              <Row className="mb-4">
                <ul>
                  {show.roles.map((role) => {
                    return <CastListItem role={role} key={role._id} />;
                  })}
                </ul>
              </Row>
            </Container>
          </>
        )
      )}
    </section>
  );
};

export default CastScreen;
