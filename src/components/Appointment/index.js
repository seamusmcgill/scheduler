import React, { Fragment } from 'react';
import "./styles.scss"
import Header from "./Header"
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'components/hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"

export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
      .then(() => transition(SHOW))  
  }

  function cancel() {
    transition(DELETING)
    cancelInterview(id)
      .then(() => transition(EMPTY))
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
          onDelete={() => transition(CONFIRM)}
        />}
      { mode === CREATE && 
        <Form 
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      }
      { mode === SAVING && 
        <Status
          message="Saving"
        />
      }
      { mode === DELETING && 
        <Status
          message="Deleting"
        />
      }
      { mode === CONFIRM  && 
        <Confirm 
          message="Are you sure you would like to delete?"
          onConfirm={() => cancel()}
        />
      }
    </article>
  )
}