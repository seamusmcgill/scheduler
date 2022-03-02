import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  // Destructure props 
  const { message, onConfirm, onCancel } = props;

  // Return Confirm component with passed message
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
        <Button onClick={onConfirm} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}
