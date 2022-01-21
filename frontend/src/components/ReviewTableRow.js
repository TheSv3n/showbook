import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import RatingWidget from "./RatingWidget";
import axios from "axios";
import { Link } from "react-router-dom";

const ReviewTableRow = ({ review }) => {
  const [companyName, setCompanyName] = useState("");
  const getCompanyName = async (companyId) => {
    const { data: name } = await axios.get(`/api/companies/${companyId}/name`);
    setCompanyName(name);
  };

  useEffect(() => {
    getCompanyName(review.company);
  }, [review]);
  return (
    <tr>
      <td className="text-light">
        {" "}
        <Link to={`/show/${review.showId}`} className="link text-light">
          <Image
            src={review.poster}
            alt={review.title}
            fluid
            className="list-image"
          ></Image>
        </Link>
      </td>
      <td className="text-light">
        <Link to={`/show/${review.showId}`} className="link text-light">
          {review.title}
        </Link>
      </td>
      <td className="text-light">
        <Link to={`/company/${review.company}`} className="link text-light">
          {companyName}
        </Link>
      </td>
      <td className="text-light">
        <RatingWidget value={review.rating} text={""} color={"orange"} />
      </td>
    </tr>
  );
};

export default ReviewTableRow;
