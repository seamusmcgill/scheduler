import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Declare state variables
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Logic to update the day in state
  const setDay = (day) => setState(prev => ({ ...prev, day }));

  // Make axios requests to set the state object
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // To live update the spots in the dayList
  function updateSpots(state, appointments, id) {
    // Find index of current day in days array
    const dayIndex = state.days.findIndex((day) => day.name === state.day);
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
    // Insert new interview into db and update state with new appointments object
    return axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => {
        return setState((prev) => {
          // Create new appointments object with new interview added
          const appointment = {
            ...prev.appointments[id],
            interview: { ...interview },
          };
          const appointments = {
            ...prev.appointments,
            [id]: appointment,
          };
          return ({...prev, 
            appointments, 
            // Update days in state only if this is a new appointment being made
            days: isEdit ? prev.days : updateSpots(prev, appointments, id)})
        });
      });
  }

  function cancelInterview(id) {
    // Insert new interview into db and update state with new appointments and days objects
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() =>
        setState((prev) => {
          // Create new appointments object with interview canceled for selected appointment
          const appointment = {
            ...prev.appointments[id],
            interview: null,
          };
          const appointments = {
            ...prev.appointments,
            [id]: appointment,
          };
          return ({
            ...prev,
            appointments,
            days: updateSpots(prev, appointments, id),
          })
        })
      );
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
