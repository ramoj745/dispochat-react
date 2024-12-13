import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Modal, Typography, Box } from "@mui/material";

import Input from "./Input";
import Button from "./Button";

function PasswordModal(props) {
  const [change, setChange] = useState("");

  function handleClose(event, reason) {
    if (reason === "backdropClick") {
      props.onClose();
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    props.checkPassword(change)
    
  }

  return ReactDOM.createPortal(
    <>
      <Modal open={props.open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            bgcolor: "#b5d5c1",
            border: "2px solid #d4ecdd",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
            maxWidth: "80%",
            transformOrigin: "center",
          }}
        >
          <Typography
            variant="h1"
            id="modal-title"
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",
              color: "black",
              width: "100%",
            }}
          >
            {props.name} is Password-Enabled
          </Typography>
          <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px"
          }}>
          <Typography variant="body" id="modal-body">
            <Input
              placeholder={"Enter the password"}
              style={{ height: "45px" }}
              onChange={(event) => setChange(event.target.value)}
              value={change}
            />
          </Typography>
          <Button
            style={{
              height: "50px",
              backgroundColor: "#345b63",
              color: "white",
            }}
          >
            Enter
          </Button>
          </form>
        </Box>
      </Modal>
    </>,
    document.getElementById("modal-root")
  );
}

export default PasswordModal;
