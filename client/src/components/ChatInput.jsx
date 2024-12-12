import React, { useState, forwardRef } from "react";
import "./ChatInput.css";

const ChatInput = forwardRef(function ChatInput(props, ref) {
  const [input, setInput] = useState("");

  function onEventOfChange(event) {
    setInput(event.target.value);
  }

  return (
    <input
      type="text"
      ref={ref}
      onChange={onEventOfChange}
      value={input}
      className="chat-input"
      placeholder="Enter your message here"
    ></input>
  );
});

export default ChatInput;
