import React, { Fragment } from 'react';
import "./styles.scss"
import Header from "./Header"
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'components/hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview } = props
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
  }

  return (
    <article className="appointment">
      <Header 
        time={time}
      />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      { mode === SHOW && 
        <Show 
          student={interview.student} 
          interviewer={interview.interviewer} 
        />}
      { mode === CREATE && 
        <Form 
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      }
    </article>
  )
}