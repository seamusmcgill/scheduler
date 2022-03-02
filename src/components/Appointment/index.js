import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "components/hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// Declare useVisualMode constants to render different appointment views
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // Destructure props
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  // Declare variables for mode in state
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // To run when saving an appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    // Transition to SAVING view before resolving/rejecting bookInterview 
    transition(SAVING);
    bookInterview(id, interview)
      // Show booked interview if successful or error if not
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // To run when deleting appointment
  function cancel() {
    // Transition to SAVING view and replace - if there is an error user can exit back to SHOW
    transition(DELETING, true);
    cancelInterview(id)
      // Show empty slot if successful or error if not
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {/* Empty appointment slot */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {/* Booked appointment view */}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {/* Making a new appointment view */}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
      {/* Editing existing appointment view */}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer.id}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
      {/* Status messages */}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {/* Confirm deletion view */}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => cancel()}
          onCancel={() => back()}
        />
      )}
      {/* Error message views */}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={() => back()} />
      )}
    </article>
  );
}
