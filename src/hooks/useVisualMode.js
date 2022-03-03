import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Update the history when transitioning to a new view
  const transition = (view, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), view]);
    } else {
      setHistory((prev) => [...prev, view]);
    }
    setMode(mode)
  };

  // Remove last element of history array when going back
  const back = () => {
    if (history.length === 1) {
      return;
    }
    setHistory((prev) => [...prev.slice(0, -1)]);
  };

  // Mode will always be last element in history array
  return { mode: history[history.length - 1], transition, back };
}
