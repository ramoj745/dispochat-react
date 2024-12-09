import React from "react";
import "./Listing.css";

function Listing(props) {
  return (
    <div className="listing">
      <p className="listingName">{props.children}</p>
    </div>
  );
}

export default Listing;
