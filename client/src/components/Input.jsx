import React from "react";
import "./Input.css";

function Input(props) {
  return (
    <>
      <input
        onChange={props.onChange}
        value={props.value}
        type="text"
        placeholder={props.placeholder}
        required={props.required}
      >
        {props.children}
      </input>
    </>
  );
}

export default Input;
