import React from "react";
import "./ChatInput.css";

function ChatInput(props) {
  return (
    <input
      type="text"
      onChange={props.onChange}
      value={props.value}
      className="chat-input"
      placeholder="Enter your message here"
    ></input>
  );
};

export default ChatInput;
