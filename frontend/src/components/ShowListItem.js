import React from "react";
import { Link } from "react-router-dom";

const ShowListItem = ({ show }) => {
  return (
    <Link to={`/show/${show._id}`}>
      <li className="list-group-item col-6 mx-auto my-2 link">{show.title}</li>
    </Link>
  );
};

export default ShowListItem;
