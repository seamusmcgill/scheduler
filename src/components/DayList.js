import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // Value refers to the selected day, onChange is setDay
  const { days, value, onChange } = props;

  const daysArray = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === value}
        setDay={onChange}
      />
    );
  });

  return <ul>{daysArray}</ul>;
}
