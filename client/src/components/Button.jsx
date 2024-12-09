import React, { useState } from "react"; //useState for animations/routing?
import "./Button.css"

function Button(props) {

  return <button onClick={props.onClick} style={props.style}>{props.children}</button>;
}

export default Button;
