import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import JoinRoom from "./pages/JoinRoom.jsx";
import ChatRoom from "./pages/ChatRoom.jsx";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3000");

function App() {

  const [currentPage, setPage] = useState("LandingPage");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.on("updateRooms", (updatedRooms) => {
      console.log(updatedRooms);
      setRooms(updatedRooms);
    });

    return () => {
      socket.off("updateRooms");
    };
  }, []);

  function navigateToCreateRoom() {
    setPage("CreateRoom");
    console.log("Navigating to CreateRoom");
  }

  function navigateToJoinRoom() {
    setPage("JoinRoom");
    console.log("Navigating to Join Room");
  }

  function navigateToChatRoom() {
    setPage("ChatRoom")
    console.log("Navigating to Chat Room")
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
        {currentPage === "CreateRoom" ? <CreateRoom onNavigate={navigateToChatRoom}/> : null}
        {currentPage === "JoinRoom" ? <JoinRoom rooms={rooms} socket={socket} /> : null}
        {currentPage === "ChatRoom" ? <ChatRoom /> : null}
      </div>
      <Footer />
    </>
  );
}

export default App;
