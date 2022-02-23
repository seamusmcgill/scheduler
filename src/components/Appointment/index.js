import React, { Fragment } from 'react';
import "./styles.scss"
import Header from "./Header"
import Show from './Show';
import Empty from './Empty';
import { useVisualMode } from 'components/hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {

  const { id, time, interview } = props
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )

  return (
    <article className="appointment">
      <Header 
        time={time}
      />
      { mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
      { mode === SHOW && 
        <Show 
          student={interview.student} 
          interviewer={interview.interviewer} 
        />}
    </article>
  )
}