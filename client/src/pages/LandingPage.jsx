import React from "react";
import "./LandingPage.css";
import dispoChat from "../assets/DispoChat-cropped.svg";
import Button from "../components/Button";

function LandingPage(props) {

  return (
    <div className="landingContainer">
      <img src={dispoChat} width="150" />
      <h1>
        Disposable chat rooms, at your <span className="service">service</span>
      </h1>

      <div className="buttons">
        <Button onClick={props.navigateJoinRoom} style={{ backgroundColor: "#ffffff" }}>Join Room</Button>
        <Button onClick={props.navigateCreateRoom} style={{ backgroundColor: "#d4ecdd" }}>
          Create Room
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
