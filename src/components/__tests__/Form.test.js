/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react"

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup, fireEvent } from "@testing-library/react"

/*
  We import the component that we are testing
*/
import Form from "components/Appointment/Form"

/*
  A test that renders a React Component
*/
afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers}/>)
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} student="Lydia Miller-Jones"/>)
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {

    const onSave = jest.fn()
    const { getByText } = render(<Form interviewers={interviewers} onSave={onSave}/> )
    fireEvent.click(getByText("Save"))
    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    
    const onSave = jest.fn()
    const { queryByText, getByText } = render(<Form student="Lydia Miller-Jones" interviewers={interviewers} onSave={onSave}/> )
    fireEvent.click(getByText("Save"))
    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("submits the name entered by the user", () => {
    // onSave is created as mock function
    const onSave = jest.fn()
    // Form is rendered with student name blank
    const { getByTestId, getByText } = render(<Form interviewers={interviewers} onSave={onSave}/>)
    // Fill in student name with fireEvent change event
    fireEvent.change(getByTestId("student-name-input"), {target: {value: "Lydia Miller-Jones"}})
    // Fire click event on save button
    fireEvent.click(getByText("Save"))
    /* onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  })
});