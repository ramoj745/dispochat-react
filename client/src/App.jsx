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
  const [currentRoomId, setRoomId] = useState(null)

  //dont mind this, this one is for updating the list component for available rooms
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

  function navigateToChatRoomFromCreate() {
    setPage("ChatRoom")
    console.log("Navigating to Chat Room")
  }

  function navigateToChatRoomFromJoin(roomId) {
    socket.emit("joinRoom", roomId);
    setPage("ChatRoom")
    setRoomId(roomId)
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
        {currentPage === "CreateRoom" ? <CreateRoom onNavigate={navigateToChatRoomFromCreate} socket={socket}/> : null}
        {currentPage === "JoinRoom" ? <JoinRoom rooms={rooms} socket={socket} onRoomSelect={navigateToChatRoomFromJoin} /> : null}
        {currentPage === "ChatRoom" ? <ChatRoom socket={socket} roomId={currentRoomId} /> : null}
      </div>
      <Footer />
    </>
  );
}

export default App;
