import React from "react";
import List from "../components/List";
import { motion } from "motion/react";

function JoinRoom(props) {
  return (
    <motion.div className="motion-div-join"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <List
        rooms={props.rooms}
        socket={props.socket}
        onRoomSelect={props.onRoomSelect}
      />
    </motion.div>
  );
}

export default JoinRoom;
