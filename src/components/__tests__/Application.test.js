import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getAllByAltText,
  getByAltText,
  getByPlaceholderText,
  debug,
  queryByText,
  getByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getAllByAltText(appointment, "Add")[0]);

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument()
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, /confirm/i))
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument()
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. Check that the form is shown with Archie Cohen as the name value.
    expect(getByTestId(appointment, "student-name-input")).toHaveValue("Archie Cohen")
    // 5. Change the name to Archie Bunker.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    // 6. Click the save button.
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that the element with the text "Saving" is displayed
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    // 8. Wait until the element with the text Archie Bunker is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument()
  });

});
