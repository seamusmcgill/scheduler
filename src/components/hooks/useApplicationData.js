import { useState, useEffect } from 'react';
import axios from 'axios'

export default function useApplicationData() {
  const [ state,  setState ] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({...state, day})

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
    )
    })
  }, [])

  function updateSpots(appointments, id) {
    // Find index of current day in days array
    const dayIndex = state.days.findIndex(day => day.name === state.day);
    // Create copy of days array
    let daysCopy = [...state.days];
    // Create copy of day you want to update
    const dayCopy = { ...state.days[dayIndex] };
    // Update spots at index in day copy depending on if appointment exists
    if (appointments[id].interview) {
      dayCopy.spots--;
    } else {
      dayCopy.spots++;
    }
    // Update copy of days and return
    daysCopy[dayIndex] = dayCopy;
    return daysCopy;
  }

  function bookInterview(id, interview) {
    // Check if the booking is being made or just edited 
    const isEdit = state.appointments[id].interview ? true : false;
    // Create new appointments object with new interview added 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Insert new interview into db and update state with new appointments object
    return axios.put(`/api/appointments/${id}`, {interview: {...interview}})
      .then(() => { 
        if (isEdit) {
          return setState(prev => ({...prev, appointments}))
        }
        return setState(prev => ({...prev, appointments, days: updateSpots(appointments, id)}))
      });
  }

  function cancelInterview(id) {

    // Create new appointments object with interview canceled for selected appointment
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Insert new interview into db and update state with new appointments object
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({...prev, appointments, days: updateSpots(appointments, id)})))
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}