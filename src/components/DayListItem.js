import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {
  // Destructure props
  const { name, spots, selected, setDay } = props;
  // Update class name to change styling depending on selected value
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });
  // Change spots message depending on spots value
  const formatSpots =
    spots === 0
      ? "no spots remaining"
      : spots === 1
      ? "1 spot remaining"
      : `${spots} spots remaining`;

  return (
    <li
      className={dayClass}
      onClick={() => setDay(name)}
      selected={selected}
      data-testid="day"
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots}</h3>
    </li>
  );
}
