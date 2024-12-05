import React from "react";
import "./Listing.css";

function Listing(props) {
  return <div className="listing">{props.children}</div>;
}

export default Listing;
