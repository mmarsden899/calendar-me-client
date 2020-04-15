import React, { useState, useEffect } from "react";
import "./MiniCalendar.scss";

const MiniCalendar = (props) => {
  console.log(props);
  const { header, weekdayShort, daysInMonth } = props;

  const defaultCalendarMap = (
    <div className="calendar mini">
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

export default MiniCalendar;
