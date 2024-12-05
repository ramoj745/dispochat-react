import React from "react";
import dispoChat from '../assets/DispoChat-cropped.svg'
import Listing from "./Listing";
import "./List.css";

function List() {
  return (
    <>
      <div className="list">
        <img src={dispoChat} className="listLogo" width="200"></img>
        <div className="listingWrapper">
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            
        </div>
      </div>
    </>
  );
}

export default List;
