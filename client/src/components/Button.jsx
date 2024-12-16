import React from "react";
import { motion } from "motion/react";
import "./Button.css";

function Button(props) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </motion.button>
  );
}

export default Button;
