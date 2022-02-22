import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss'

export default function InterviewerList(props) {

  // Value refers to selected interviewer, onChange is setInterviewer
  const { interviewers, value, onChange } = props

  const interviewersArray = interviewers.map(interviewer => {
    return <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer.id)}  />
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersArray}
      </ul>
    </section>
  )
}