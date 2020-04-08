import React from "react";
import NewCalendar from './NewCalendar'
import apiUrl from './apiConfig'
import axios from 'axios'
import { useAuth0 } from "./react-auth0-spa";

const Admin = () => {

    const {user} = useAuth0();
    const calendar = NewCalendar

    const createCalendar = async () => {
        console.log(NewCalendar)
        await axios.post(apiUrl + '/calendars', {calendar: {calendar}, user: user})
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <button onClick={createCalendar}>create calendar</button>
        </div>
    )
};

export default Admin