import React, { useState, useEffect } from "react";
import "./FullCalendar.scss";

const FullCalendar = (props) => {
  const { header, weekdayShort, daysInMonth } = props;
  const defaultCalendarMap = (
    <div className="calendar full">
      {header}
      <table className="calendar">
        <thead>
          <tr>{weekdayShort}</tr>
        </thead>
        <tbody>{daysInMonth}</tbody>
      </table>
    </div>
  );

  return <div className="calendar-view-container">{defaultCalendarMap}</div>;
};

export default FullCalendar;
