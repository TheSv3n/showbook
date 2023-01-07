import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PerformanceListItem = ({
  performance,
  handleUpdatePerformance,
  fromReview,
}) => {
  const navigate = useNavigate();
  const [performanceDate, setPerformanceDate] = useState("");
  const [performanceTime, setPerformanceTime] = useState("");
  const [performanceVenue, setPerformanceVenue] = useState("");

  const getPerformanceInfo = async () => {
    let performanceDate;

    performanceDate = performance.date.toString();

    const { data: name } = await axios.get(
      `/api/venues/${performance.venueId}/name`
    );
    setPerformanceVenue(name);
    setPerformanceDate(performanceDate.substr(0, 10));
    setPerformanceTime(performanceDate.substr(11, 5));
  };

  useEffect(() => {
    getPerformanceInfo(performance);
  }, [performance]);
  return (
    <li
      className="list-group-item col-6 mx-auto my-2 link"
      onClick={() => {
        if (fromReview) {
          handleUpdatePerformance(
            performance._id,
            `${performanceDate} at ${performanceVenue}`
          );
        } else {
          navigate(`/venue/${performance.venueId}`);
        }
      }}
    >
      {performanceDate} - {performanceTime} at {performanceVenue}
    </li>
  );
};

export default PerformanceListItem;
