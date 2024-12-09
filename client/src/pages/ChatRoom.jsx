import React from "react";
import "./ChatRoom.css";
import ChatBubbleReceiver from "../components/ChatBubbleReceiver";
import ChatBubbleSender from "../components/ChatBubbleSender";
import ChatInput from "../components/ChatInput";
import SvgIcon from "@mui/material/SvgIcon";
import { IconButton } from "@mui/material";

function ChatRoom() {
  return (
    <>
      <div className="container">
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
          <ChatBubbleReceiver>Hey, how are you?</ChatBubbleReceiver>
          <ChatBubbleSender>I'm good, thanks. How about you?</ChatBubbleSender>
      </div>
      <div className="send-message">
          <ChatInput />
          <IconButton
            sx={{
              width: "70px",
              height: "70px",
            }}
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
