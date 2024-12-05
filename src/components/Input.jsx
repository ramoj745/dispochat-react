import React from "react";
import "./Input.css";

function Input(props) {
  return (
    <>
      <input type="text" placeholder={props.placeholder}>{props.children}</input>
    </>
  );
}

export default Input;
