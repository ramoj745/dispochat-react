import React from "react";
import "./ChatBubbleSender.css";

function ChatBubbleSender(props) {
  return (
    <div className="message sender">
      <p>{props.children}</p>
    </div>
  );
}

export default ChatBubbleSender;
