import React from "react";
import "./ChatBubbleReceiver.css";

function ChatBubbleReceiver(props) {
  return (
    <div className="message receiver">
      <p>{props.children}</p>
    </div>
  );
}

export default ChatBubbleReceiver;
