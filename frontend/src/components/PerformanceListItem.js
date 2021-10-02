import React, { useEffect, useState } from "react";
import axios from "axios";

const PerformanceListItem = ({ performance }) => {
  const [performanceDate, setPerformanceDate] = useState("");
  const [performanceVenue, setPerformanceVenue] = useState("");

  const getPerformanceInfo = async () => {
    let performanceDate;

    performanceDate = performance.date.toString();

    const { data: name } = await axios.get(
      `/api/venues/${performance.venueId}/name`
    );
    setPerformanceVenue(name);
    setPerformanceDate(performanceDate.substr(0, 10));
  };

  useEffect(() => {
    getPerformanceInfo(performance);
  }, [performance]);
  return (
    <div>
      {performanceDate} at {performanceVenue}
    </div>
  );
};

export default PerformanceListItem;
