<p align="center">
  <img src="https://github.com/user-attachments/assets/25169982-234f-4c68-bd01-8b1bd136161e" width="300" height="200"/>
</p>

# <p align="center">DispoChat</p>

<p align="center">
  <strong>Disposable chat rooms, at your service</strong>
</p>



---

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Application Flow](#application-flow)
- [Design](#design)
- [Installation](#installation)
- [Usage](#usage)
- [To-Do and Future Features](#to-do-and-future-features)
- [Takeaways](#takeaways)
- [License](#license)

---

## About the Project

**DispoChat** is a full-stack web application that provides temporary, disposable chat rooms. The goal was to gain experience in React, backend development with Node.js and Express, and working with real-time communication using Socket.io. No routers were used; the app relies on conditional rendering and state management to navigate between pages.

---

## Tech Stack

- **Frontend:** React, MUI (Material-UI), Framer Motion
- **Backend:** Node.js, Express, MongoDB
- **Real-time Communication:** Socket.io
- **Design Tool:** Canva

---

## Features

- **Create Chat Rooms** with optional passwords.
- **Join Existing Rooms** via a dynamic, real-time list of available rooms.
- **Real-time Chat** using WebSockets for seamless communication.
- **Password Protection** for private rooms.
- **Leave Room** functionality that deletes the room when all users leave.
- **Responsive Design** with centered, minimal layouts.
- **Animations** for smooth transitions and user interactions.

---

## Application Flow

1. **Landing Page:**
   - Hero heading with "Join Room" and "Create Room" buttons.

2. **Create Room:**
   - Input for room name and optional password.
   - Redirects to a new chat room upon submission.

3. **Join Room:**
   - Scrollable list of available rooms.
   - Password prompt (if applicable) or direct entry.

4. **Chat Room:**
   - List of current users.
   - Chatbox for sending messages.
   - "End Room" button to close the chat room.

---

## Design

- **Color Palette:** Blue-themed, minimalistic design.
- **Layout:** Simple, centered components.
- **Animations:** Framer Motion for transitions.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ramoj745/dispochat-react.git
   cd dispochat-react
   ```

2. Install dependencies for client and server:
   ```bash
   cd ./client
   npm install

   cd ./server
   npm install
   ```

3. Start vite & node server:
   ```bash
   npm run dev
   node server.js
   ```

4. The app should now be running on `http://localhost:3000` for server, and `http://localhost:5137` for vite.

---

## Usage

1. **Create a Room:**
   - Go to the "Create Room" page, enter a room name and optional password.

2. **Join a Room:**
   - Navigate to "Join Room" to see available rooms and join one.

3. **Chat:**
   - Once in a room, chat in real-time with others.

4. **Leave Room:**
   - Use the "End Room" button or close the tab to leave the room.

---

## To-Do and Future Features

- **Auto-disconnect:** Automatically remove users who refresh or close their tab.
- **Empty State UI:** Display a message like "Rooms will appear here" when no rooms are available.
- **Footer Credits:** Add copyright and GitHub profile links.
- **Logo:** Consider adding a subtle logo in the chat room.

---

## Takeaways

This project was a journey of learning and growth:

- **React State Management:** Mastered conditional rendering and passing data between components.
- **WebSockets:** Implemented real-time features using Socket.io.
- **Full-Stack Development:** Gained experience connecting a React frontend to a Node.js/Express backend.
- **Design Principles:** Kept the UI simple, clean, and user-friendly.

This was my most ambitious project to date, and despite the challenges, I've learned so much about building scalable and dynamic web applications.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

### Acknowledgments

Special thanks to **ChatGPT** for helping me through the challenges and to the countless online resources that made this project possible.

> "Explore. Dream. Discover."

