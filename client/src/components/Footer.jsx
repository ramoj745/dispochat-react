import React, { useState, useEffect } from "react";
import ExitRoom from "./ExitRoom";
import "./Footer.css";

function Footer(props) {
  const [inChatRoom, setInChatRoom] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    function handleJoinRoom(data) {
      setInChatRoom(true);
      setClientId(data.clientId);
      setRoomId(data.roomId);
    }

    props.socket.on("JoinRoom", handleJoinRoom);

    return () => {
      props.socket.off("JoinRoom");
    };
  }, [props.socket]);

  return (
    <footer>
      {inChatRoom ? (
        <ExitRoom
          clientData={{ clientId, roomId }}
          onLeave={props.onLeave}
          reRender={setInChatRoom}
        />
      ) : (
        null
      )}
    </footer>
  );
}

export default Footer;
