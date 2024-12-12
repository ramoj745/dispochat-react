import React, {useState} from "react";
import List from "../components/List";

function JoinRoom(props) {

  return(
    <List rooms={props.rooms} socket={props.socket} onRoomSelect={props.onRoomSelect} />
  )
}

export default JoinRoom;
