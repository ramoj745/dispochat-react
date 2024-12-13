import React, { useState, useEffect } from "react";
import dispoChat from "../assets/DispoChat-cropped.svg";
import Listing from "./Listing";
import "./List.css";

function List(props) {
  return (
    <>
      <div className="list">
        <img src={dispoChat} className="listLogo" width="200"></img>
        <div className="listingWrapper">
          {props.rooms.map((room) => {
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
          })}
        </div>
      </div>
    </>
  );
}

export default List;
