import React from "react";

const VenueListItem = ({
  venue,
  setVenueName,
  setVenueId,
  updateShowModal,
}) => {
  return (
    <li
      className="list-group-item col-6 mx-auto my-2 link"
      onClick={() => {
        setVenueName(venue.name);
        setVenueId(venue._id);
        updateShowModal();
      }}
    >
      {venue.name}
    </li>
  );
};

export default VenueListItem;
