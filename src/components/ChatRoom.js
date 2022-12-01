import React, { useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCgLBah0eGYaTVSqc_kfdv4tCGeOiHA2ZQ",
  authDomain: "chat-system-67034.firebaseapp.com",
  projectId: "chat-system-67034",
  storageBucket: "chat-system-67034.appspot.com",
  messagingSenderId: "123521492390",
  appId: "1:123521492390:web:0c70c6a21c66c60ee15b67",
  measurementId: "G-E0KBFPD6JL",
});

const firestore = firebase.firestore();
function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    let imageUrl;
    if (JSON.parse(localStorage.getItem("Profile")).imageUrl == null) {
      imageUrl = "https://api.adorable.io/avatars/23/abott@adorable.png";
    } else {
      imageUrl = JSON.parse(localStorage.getItem("Profile")).imageUrl;
    }

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: localStorage.getItem("EMAIL"),
      photoURL: imageUrl,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
