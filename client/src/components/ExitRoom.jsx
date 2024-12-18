import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton } from "@mui/material";
import axios from "axios";

function ExitRoom(props) {
  const clientId = props.clientData.clientId;
  const roomId = props.clientData.roomId;
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  async function onLeave() {
    try {
      const response = await axios.delete(
        `${backendUrl}/LeaveRoom/${roomId}/user/${clientId}`
      );
      console.log(response.data.message);

      if (response) {
        props.onLeave("LandingPage");
        props.reRender(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <IconButton className="exit-button"
      onClick={onLeave}
      sx={{
        color: "#ff5757",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "10%",
        gap: "5px",
        fontSize: "1rem",
        transition: "0.3s ease",
        "&:hover": {
          color: "white",
          "& p": {
            color: "white",
          }
        },
      }}
    >
      <ExitToAppIcon />
      <span>Leave Room</span>
    </IconButton>
  );
}

export default ExitRoom;
