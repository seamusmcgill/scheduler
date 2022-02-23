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