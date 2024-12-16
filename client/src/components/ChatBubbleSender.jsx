import React from "react";
import "./ChatBubbleSender.css";
import { motion } from "motion/react";

function ChatBubbleSender(props) {
  return (
    <motion.div className="message sender" animate={{ x: -5 }}>
      <p>{props.children}</p>
    </motion.div>
  );
}

export default ChatBubbleSender;
