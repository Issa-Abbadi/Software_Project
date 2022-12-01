import React, { useRef, useState, useEffect } from "react";

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass =
    uid === localStorage.getItem("EMAIL") ? "sent" : "received";

  console.log("uid", uid);
  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
          referrerpolicy="no-referrer"
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatMessage;
