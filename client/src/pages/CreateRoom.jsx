import React, {useState} from "react";
import "./CreateRoom.css";
import Form from "../components/Form";

function CreateRoom(props) {

  return (
    <>
      <Form onNavigate={props.onNavigate} socket={props.socket}></Form>
    </>
  );
}

export default CreateRoom;
