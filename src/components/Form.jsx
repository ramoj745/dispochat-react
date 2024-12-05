import React from "react";
import "./Form.css";
import dispoChat from "../assets/DispoChat-cropped.svg";
import Input from "./Input";
import Button from "./Button";


function Form(props) {
  return (
    <>
      <form className="form">
        <img src={dispoChat} className="formImg" width="200" />
        <div className="inputs">
          <Input placeholder="Room Name"></Input>
          <Input placeholder="Room Code"></Input>
          <p>*Optional</p>
        </div>
        <Button style={{"backgroundColor":"#345b63","color":"white"}}>Create Room</Button>
      </form>
    </>
  );
}

export default Form;
