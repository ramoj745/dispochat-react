import React, { useState } from "react";
import "./Form.css";
import dispoChat from "../assets/DispoChat-cropped.svg";
import Input from "./Input";
import Button from "./Button";
import Axios from "axios";

function Form(props) {
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  function onEventOfChange(event, setter) {
    setter(event.target.value);
    console.log(event.target.value);
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (!roomName.length) {
      alert("Room Name is a required field.");
    } else {
      try {
        const response = await Axios.post("http://localhost:3000/createRoom", {
          name: roomName,
          password: roomCode,
          clientId: props.socket.id,
        });
        if (response) {
          props.onNavigate(response.data._id);
          console.log("New room created:", response.data._id)
        } // Do logic for passing data from response to ChatRoom here later
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <>
      <form className="form">
        <img src={dispoChat} className="formImg" width="200" />
        <div className="inputs">
          <Input
            onChange={(event) => onEventOfChange(event, setRoomName)}
            value={roomName}
            placeholder="Room Name"
            required={true}
          ></Input>
          <Input
            onChange={(event) => onEventOfChange(event, setRoomCode)}
            value={roomCode}
            placeholder="Room Code"
          ></Input>
          <p>*Optional</p>
        </div>
        <Button
          type="submit"
          onClick={onSubmit}
          style={{ backgroundColor: "#345b63", color: "white" }}
        >
          Create Room
        </Button>
      </form>
    </>
  );
}

export default Form;
