import React from 'react';
import "./styles.scss"
import Header from "./Header"
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'components/hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm'
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

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
      .catch((error) => transition(ERROR_SAVE, true))  
  }

  function cancel() {
    transition(DELETING, true)
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
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
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />}
      { mode === CREATE && 
        <Form 
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      }
      { mode === EDIT && 
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer.id}
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
      {mode === ERROR_SAVE && 
        <Error 
          message="Could not save appointment."
          onClose={() => back()}
        />
      }
      {mode === ERROR_DELETE && 
        <Error 
          message="Could not delete appointment."
          onClose={() => back()}
        />
      }
    </article>
  )
}