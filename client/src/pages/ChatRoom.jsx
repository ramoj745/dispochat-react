import React, { useRef, useState, useEffect } from "react";
import "./ChatRoom.css";
import ChatBubbleReceiver from "../components/ChatBubbleReceiver";
import ChatBubbleSender from "../components/ChatBubbleSender";
import ChatInput from "../components/ChatInput";
import SvgIcon from "@mui/material/SvgIcon";
import { IconButton } from "@mui/material";
import axios from "axios";

function ChatRoom(props) {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => { //on component mount,

    props.socket.on("loadMessages", (messages) => { // load messages from the server
      console.log("Loaded messages from the database:", messages);
      setMessages(messages)
    });

    props.socket.on("newMessage", (data) => {  //listen for new messages from the server
      if (data.roomId === props.roomId) {
        setMessages((prevMessages) => [...prevMessages, data]); 
      }
    });

    return () => {
      props.socket.off("newMessage");
      props.socket.off("loadMessages");
    };
  });

  async function sendMessage() {
    const message = inputRef.current.value;
    if (inputRef.current) {
      console.log("Input Value:", message); 

      try {
        if (props.socket.id) {
          await axios.post("http://localhost:3000/sendMessage", {
            roomId: props.roomId,
            senderId: props.socket.id,
            message: message,
          });
        }

        props.socket.emit("newMessage", { // emit to server for realtime comms
          roomId: props.roomId,
          senderId: props.socket.id,
          message: message,
        })

      } catch (err) {
        console.error(err);
      }

      inputRef.current.value = "";
    }
  }

  return (
    <>
      <div className="container">
        {messages.map((message, index) => { //simple check if sender/receiver chat bubble
          const isSender = message.senderId === props.socket.id;
          return isSender ? (
            <ChatBubbleSender key={index}>{message.message}</ChatBubbleSender>
          ) : (
            <ChatBubbleReceiver key={index}>
              {message.message}
            </ChatBubbleReceiver>
          );
        })}
      </div>
      <div className="send-message">
        <ChatInput ref={inputRef} />
        <IconButton
          sx={{
            width: "70px",
            height: "70px",
          }}
          onClick={sendMessage}
        >
          <SvgIcon
            sx={{
              width: "40px",
              height: "50px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              zoomAndPan="magnify"
              preserveAspectRatio="xMidYMid meet"
              version="1.0"
              viewBox="305.29 81.35 414.02 413.49"
            >
              <path
                fill="#d4ecdd"
                d="M 313.320312 225.710938 C 302.628906 222.144531 302.527344 216.390625 313.527344 212.722656 L 704.53125 82.394531 C 715.367188 78.789062 721.574219 84.851562 718.542969 95.464844 L 606.816406 486.449219 C 603.742188 497.285156 597.496094 497.652344 592.90625 487.367188 L 519.28125 321.683594 L 642.191406 157.800781 L 478.308594 280.710938 Z M 313.320312 225.710938 "
                fillOpacity="1"
                fillRule="nonzero"
              />
            </svg>
          </SvgIcon>
        </IconButton>
      </div>
    </>
  );
}

export default ChatRoom;
