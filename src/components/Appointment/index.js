import React from 'react';
import "./styles.scss"
import Header from "./Header"

export default function Appointment(props) {
  return (
    <article className="appointment">
      {props.time ? `Appointment at ${props.time}` : 'No appointments'}
    </article>
  )
}