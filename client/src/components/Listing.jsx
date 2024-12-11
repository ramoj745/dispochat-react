import React from "react";
import axios from "axios";
import "./Listing.css";

function Listing(props) {
  const roomId = props.roomId;

  async function onRoomNavigate() {
    const response = await axios.post("http://localhost:3000/getRoom", {
      roomId: roomId,
      socket: props.socket.id,
    });

    console.log(response.data)
  }

  return (
    <div onClick={onRoomNavigate} className="listing">
      <p className="listingName">{props.children}</p>
    </div>
  );
}

export default Listing;
