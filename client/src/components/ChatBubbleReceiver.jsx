import React from "react";
import "./ChatBubbleReceiver.css";
import { motion } from "motion/react";

function ChatBubbleReceiver(props) {
  return (
    <motion.div className="message receiver" animate={{ x: 5 }}>
      <p>{props.children}</p>
    </motion.div>
  );
}

export default ChatBubbleReceiver;
