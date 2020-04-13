import React, { useState, useEffect } from "react";
import FullCalendar from "./FullCalendar";
import MiniCalendar from "./MiniCalendar";
import { useAuth0 } from "../react-auth0-spa";
import moment from "moment";
import apiUrl from "../apiConfig";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faHandHoldingWater,
} from "@fortawesome/free-solid-svg-icons";
import "./CalendarView.scss";
import config from "../auth_config.json";

const CalendarView = () => {
  const [dateObject, setDateObject] = useState(moment());
  const [calendar, setCalendar] = useState({});
  const [holidays, setHolidays] = useState([]);

  const currentDate = Number(moment().date());
  const currentMonth = moment().format("MMMM");
  const { user } = useAuth0();

  useEffect(() => {
    const loadStuff = async () => {
      const holidayResponse = await axios(
        `https://calendarific.com/api/v2/holidays?api_key=${
          config.holiday
        }&country=US&year=${moment(dateObject).format(
          "YYYY"
        )}&type=national,observance`
      );
      const filtered = holidayResponse.data.response.holidays.filter(
        (holiday) =>
          holiday.type[0] === "National holiday" ||
          holiday.type[0] === "Observance"
      );
      console.log("filtered! ---->", filtered);
      setHolidays(filtered);
      console.log(holidayResponse.data.response.holidays);
      if (user) {
        try {
          const getCalendar = await axios(apiUrl + "/calendars/" + user.sub);
          setCalendar(getCalendar.data.calendar);
          console.log(getCalendar);
        } catch (error) {
          const sendCalendar = await axios.post(apiUrl + "/calendars", {
            calendar: { calendar },
            user: user,
          });
          setCalendar(sendCalendar.data.calendar);
          console.log(sendCalendar);
        }
      } else {
        console.log("try signing up to personalize your calendar today!");
      }
    };
    loadStuff();
  }, [dateObject]);

  const findHoliday = (date) => {
    const returned = holidays.filter((holiday) => holiday.date.iso === date);
    return returned;
  };

  const handleDayMap = (date) => {
    let formatedDate = date;
    if (date.toString().length < 2) {
      formatedDate = "0" + formatedDate.toString();
    }
    return `${moment(dateObject).format("YYYY")}-${moment(dateObject).format(
      "MM"
    )}-${formatedDate}`;
  };

  const firstDay = () => {
    let first = dateObject.startOf("month").format("d");
    return first;
  };

  let blankDays = [];
  for (let i = 0; i < firstDay(); i++) {
    blankDays.push(
      <td key={`blank${i}`} className="calendar-day empty">
        {""}
      </td>
    );
  }

  const limiter = (name) => {
    if (name.length > 20) {
      return name.substring(0, 20) + "..";
    } else {
      return name;
    }
  };

  const currentChecker = (k) => {
    if (k === currentDate && dateObject.format("MMMM") === currentMonth) {
      return "day current-day";
    } else {
      return "day";
    }
  };

  const holidaybyDay = (k) => {
    const answer = handleDayMap(k);
    const whatever = findHoliday(answer);
    return whatever.map((holiday) => (
      <div
        className={
          holiday.type[0] === "National holiday"
            ? "single green"
            : "single blue"
        }
      >
        {limiter(holiday.name)}
      </div>
    ));
  };

  let days = [];
  for (let k = 1; k <= dateObject.daysInMonth(); k++) {
    days.push(
      <td key={k} className="calendar-day">
        <div className="calendar-day-container">
          <div className="day-container">
            <div className="date-container">
              <div className={currentChecker(k)}>{k}</div>
            </div>
            <div className="holday-container">{holidaybyDay(k)}</div>
          </div>
        </div>
      </td>
    );
  }

  const weekdayShort = moment.weekdaysShort().map((day) => {
    return <th key={day}>{day}</th>;
  });

  var totalSlots = [...blankDays, ...days];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  let daysInMonth = rows.map((d, i) => {
    return (
      <tr
        key={`days${i}`}
        style={
          i > 0
            ? { height: `calc(100vh / ${rows.length} + 5px)` }
            : { height: 0 }
        }
      >
        {d}
      </tr>
    );
  });

  const handleMonthBack = () => {
    const newDate = moment(dateObject).subtract(1, "months");
    setDateObject(newDate);
  };

  const handleMonthForward = () => {
    const newDate = moment(dateObject).add(1, "months");
    setDateObject(newDate);
  };

  const header = (
    <div className="mini-header">
      <div className="arrow-container">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={handleMonthBack}
          className="hover"
        />
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={handleMonthForward}
          className="hover"
        />
      </div>
      <div className="mini-month">{dateObject.format("MMMM YYYY")}</div>
    </div>
  );

  return (
    <div className="calendar-view">
      {/* <MiniCalendar
        header={header}
        weekdayShort={weekdayShort}
        daysInMonth={daysInMonth}
      /> */}
      <div className="full-calendar">
        <FullCalendar
          header={header}
          weekdayShort={weekdayShort}
          daysInMonth={daysInMonth}
        />
      </div>
    </div>
  );
};

export default CalendarView;
