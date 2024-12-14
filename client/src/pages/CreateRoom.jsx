import React from "react";
import Form from "../components/Form";

function CreateRoom(props) {
  return <Form onNavigate={props.onNavigate} socket={props.socket}></Form>;
}

export default CreateRoom;
