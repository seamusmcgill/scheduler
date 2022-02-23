export function getAppointmentsForDay(state, day) {
  // Initialize dayAppointments array
  const dayAppointments = []
  // Find correct day object in state
  const dayObject = state.days.find(element => element.name === day)
  // If day not found return empty array
  if (!dayObject) return dayAppointments
  // For each appointment ID in day object push matching state appointment object into dayAppointments
  dayObject.appointments.forEach(appointment => {
    dayAppointments.push(state.appointments[appointment])
  })
  return dayAppointments
}

export function getInterview(state, interview) {
  // Return null if not passed an interview
  if (!interview) return null;
  // Find interviewer and insert interviewer object into returned interview object
  let interviewerID = interview.interviewer
  let appointmentInterviewer = state.interviewers[interviewerID]
  return {...interview, interviewer: appointmentInterviewer}
}