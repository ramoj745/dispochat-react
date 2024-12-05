import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import JoinRoom from "./pages/JoinRoom.jsx";
import "./App.css";

function App() {
  const [currentPage, setPage] = useState("LandingPage");

  function navigateToCreateRoom() {
    setPage("CreateRoom");
    console.log("Navigating to CreateRoom");
  }

  function navigateToJoinRoom() {
    setPage("JoinRoom");
    console.log("Navigating to Join Room");
  }

  return (
    <>
      <Header />
      <div className="content">
        {currentPage === "LandingPage" ? (
          <LandingPage
            navigateCreateRoom={navigateToCreateRoom}
            navigateJoinRoom={navigateToJoinRoom}
          />
        ) : null}
        {currentPage === "CreateRoom" ? <CreateRoom /> : null}
        {currentPage === "JoinRoom" ? <JoinRoom /> : null}
      </div>
      <Footer />
    </>
  );
}

export default App;
