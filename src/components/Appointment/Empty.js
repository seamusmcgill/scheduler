import React from "react";

export default function Empty(props) {
  // Destructure props
  const { onAdd } = props;

  // Return Empty component (when no appointment is booked)
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
}
