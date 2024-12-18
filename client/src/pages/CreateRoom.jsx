import React from "react";
import Form from "../components/Form";
import { motion } from "motion/react";

function CreateRoom(props) {
  return (
    <motion.div className="motion-div-create"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Form onNavigate={props.onNavigate} socket={props.socket} />
    </motion.div>
  );
}

export default CreateRoom;
