import React, { useEffect, useState } from "react";
import axios from "axios";

const VenuePerformanceListItem = ({ performance }) => {
  const [performanceDate, setPerformanceDate] = useState("");
  const [performanceTime, setPerformanceTime] = useState("");
  const [showTitle, setShowTitle] = useState("");

  const getPerformanceInfo = async () => {
    let performanceDate;

    performanceDate = performance.performance.date.toString();

    const { data: title } = await axios.get(
      `/api/shows/${performance.showId}/name`
    );
    setShowTitle(title);

    setPerformanceDate(performanceDate.substr(0, 10));
    setPerformanceTime(performanceDate.substr(11, 5));
  };

  useEffect(() => {
    getPerformanceInfo(performance);
  }, [performance]);
  return (
    <li className="list-group-item col-6 mx-auto my-2 link">
      {showTitle} - {performanceDate} - {performanceTime}
    </li>
  );
};

export default VenuePerformanceListItem;
