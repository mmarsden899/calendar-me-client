import React, { useState, useEffect } from 'react'
import moment from 'moment'

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
        const loadDefaultData = async () => {
            const current = moment().format('LLLL')
            setCurrentDate(current)
            console.log(current)
        }
        loadDefaultData()
    }, [])
    return (
        <div>{currentDate}</div>
    )
}

export default Calendar
