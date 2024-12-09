import React from "react";
import List from "../components/List";

function JoinRoom(props) {
  return(
    <List rooms={props.rooms} socket={props.socket} />
  )
}

export default JoinRoom;
