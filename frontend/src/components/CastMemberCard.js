import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Col, Card } from "react-bootstrap";
import axios from "axios";

const CastMemberCard = ({ role }) => {
  const [castMember, setCastMember] = useState({});

  const getCastmemberInfo = async (castMemberId) => {
    const { data } = await axios.get(`/api/castmembers/${castMemberId}`);
    setCastMember(data);
  };

  useEffect(() => {
    getCastmemberInfo(role.castMemberId);
  }, [role]);

  return (
    <Col md={3} className="mb-2">
      <Card className="bg-light h-100">
        <Card.Body className="text-center">
          <Link
            to={`/castmember/${castMember._id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="img-container">
              <Image
                src={castMember.coverImage}
                alt={castMember.name}
                fluid
                className="card-image"
              ></Image>
            </div>
          </Link>
          <h3 className="card-title mb-3">{castMember.name}</h3>
          <p className="card-text">{role.role}</p>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CastMemberCard;
