import React, { useState, useEffect } from "react";
import axios from "axios";
import dispoChat from "../assets/DispoChat-cropped.svg";
import Listing from "./Listing";
import "./List.css";

function List(props) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL
        );

        if (response.data) {
          console.log("Server status:", response.data);
          setConnected(true);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (!connected) {
      const intervalId = setInterval(() => {
        fetchRooms();
      }, 1000);

      return () => {  
        clearInterval(intervalId);
      };
    }
  }, [connected]);

  return (
    <div className="list">
      <img src={dispoChat} className="listLogo" width="200"></img>

      <div className="listingWrapper">
        {connected ? (
          props.rooms.length > 0 ? (
            props.rooms.map((room) => {
              return (
                <Listing
                  key={room._id}
                  roomId={room._id}
                  name={room.name}
                  socket={props.socket}
                  onRoomSelect={props.onRoomSelect}
                >
                  {room.name}
                </Listing>
              );
            })
          ) : (
            <p className="noRoom">No Rooms Available ☹️</p>
          )
        ) : (
          <p className="connectingServer">Connecting To Server</p>
        )}
      </div>
    </div>
  );
}

export default List;
