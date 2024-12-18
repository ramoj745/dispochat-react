import React from "react";
import "./LandingPage.css";
import dispoChat from "../assets/DispoChat-cropped.svg";
import Button from "../components/Button";
import { motion } from "motion/react";

function LandingPage(props) {
  return (
    <motion.div
      className="landingContainer"
      initial={{ scale: 0 }} animate={{ scale: 1 }}
    >
      <img src={dispoChat} width="150" />
      <h1>
        Disposable chat rooms, at your <span className="service">service</span>
      </h1>

      <div className="buttons">
        <Button
          onClick={props.navigateJoinRoom}
          style={{ backgroundColor: "#ffffff", color: "black" }}
        >
          Join Room
        </Button>
        <Button
          onClick={props.navigateCreateRoom}
          style={{ backgroundColor: "#d4ecdd", color: "black" }}
        >
          Create Room
        </Button>
      </div>
    </motion.div>
  );
}

export default LandingPage;
