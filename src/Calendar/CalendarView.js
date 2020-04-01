import React, { useState, useEffect } from 'react'
import moment from 'moment'

const CalendarView = () => {

    const [currentDate, setCurrentDate] = useState({})

    useEffect(() => {
        const loadDefaultData = async () => {
            const current = moment()
            setCurrentDate(current)
        }
        loadDefaultData()
    }, [])

    const firstDay = () => {
        let dateObject = moment()
        let first = moment(dateObject).startOf('month').format('d')
        return first
    }

    let blankDays = []
    for (let i = 0; i < firstDay(); i++) {
        blankDays.push(
        <td className="calendar-day empty">{''}</td>
        )
    }
    let days = [];
    for (let k = 1; k <= moment().daysInMonth(); k++) {
        days.push(
            <td key={k} className="calendar-day">
          {k}
        </td>
      );
    }
    
    const weekdayShort = moment.weekdaysShort().map(day => {
        return (
            <th key={day}>{day}</th>
        )
    })

    var totalSlots = [...blankDays, ...days];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
          cells.push(row); // if index not equal 7 that means not go to next week
        } else {
          rows.push(cells); // when reach next week we contain all td in last week to rows 
          cells = []; // empty container 
          cells.push(row); // in current loop we still push current row to new container
        }
        if (i === totalSlots.length - 1) { // when end loop we add remain date
          rows.push(cells);
        }
      });

    let daysInMonth = rows.map((d, i) => {
        return <tr>{d}</tr>;
      });

      const defaultCalendarMap = (
        <table className="calendar-day">
        <thead>
          <tr>{weekdayShort}</tr>
        </thead>
        <tbody>{daysInMonth}</tbody>
      </table>
      )
    return (
        <div className="calendar-view-container">
            {defaultCalendarMap}
        </div>
    )
}

export default CalendarView
