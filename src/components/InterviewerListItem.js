import React from 'react';
import classNames from 'classnames';

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  )
}