import React from "react";
import "./longInput.css";

export const LongInput = (props) => {
  return (
    <input className="input" {...props}>
      {props.children}
    </input>
  );
};