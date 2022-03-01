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

  function updateSpots(add) {
    // Find index of current day in days array
    const dayIndex = state.days.findIndex(day => day.name === state.day)
    // Create copy of days array 
    const daysCopy = [...state.days];
    // Update spots at index 
    if (add) {
      daysCopy[dayIndex].spots--
    } else {
      daysCopy[dayIndex].spots++
    }
    return daysCopy;
  }

  function bookInterview(id, interview) {
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
      .then(() => setState({...state, appointments, days: updateSpots(true)}))
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
      .then(() => setState({...state, appointments, days: updateSpots()}))
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}