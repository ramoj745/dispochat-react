import React, { useState } from "react";
import axios from "axios";
import "./Listing.css";
import PasswordModal from "./passwordModal";

function Listing(props) {
  const roomId = props.roomId;
  const clientId = props.socket.id;

  const [modal, openModal] = useState(false);
  const handleOpen = () => openModal(true);
  const handleClose = () => openModal(false);

  async function onRoomNavigate() {
    const response = await axios.post("http://localhost:3000/joinRoom", {
      roomId: roomId,
      clientId: clientId,
    });
    const passwordEnabled = response.data.isPasswordProtected

    if (passwordEnabled) {
      console.log(response.data.message)
      handleOpen() //open password modal if password-enabled
    } else {
      props.onRoomSelect(roomId)
    }
  }

  async function checkPassword(password, setPassword, setErrMsg){
    const response = await axios.post("http://localhost:3000/joinRoom", {
      roomId: roomId,
      clientId: clientId,
      password: password,
    });

    const isAuthenticated = response.data.room
    if (isAuthenticated) {
      props.onRoomSelect(roomId)
    } else {
      setPassword("")
      setErrMsg(response.data.message)

      setTimeout(() => {
        setErrMsg("Enter your password")
      }, 1000)

      console.error(response.data.message)
    }
  }

  return (
    <>
    <PasswordModal open={modal} onClose={handleClose} name={props.name} checkPassword={checkPassword} />
      <div onClick={onRoomNavigate} className="listing">
        <p className="listingName">{props.children}</p>
      </div>
    </>
  );
}

export default Listing;
