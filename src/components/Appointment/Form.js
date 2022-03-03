import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  // Destructure props
  const { interviewers, onSave, onCancel } = props;
  // Declare state variables
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Reset the student and interviewer in state
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // Empty form fields and go back to empty
  const cancel = () => {
    reset();
    onCancel();
  };

  // Check whether valid student name was entered
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    onSave(student, interviewer);
  };

  // Return Form component to book an appointment
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewer}
          interviewers={interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
