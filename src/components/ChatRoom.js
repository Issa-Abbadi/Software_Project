import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import firebase from "firebase/compat/app";
import Avatar from "@mui/material/Avatar";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import axios from "axios";
import { Navigate } from "react-router-dom";

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

  const query1 = messagesRef
    .where("uid", "==", localStorage.getItem("EMAIL"))
    .where("Toid", "==", localStorage.getItem("EMAIL2"))
    .orderBy("createdAt")
    .limit(25);

  const query2 = messagesRef
    .where("uid", "==", localStorage.getItem("EMAIL2"))
    .where("Toid", "==", localStorage.getItem("EMAIL"))
    .orderBy("createdAt")
    .limit(25);

  let [messages1] = useCollectionData(query1, { idField: "id" });
  let [messages2] = useCollectionData(query2, { idField: "id" });
  const [markets, setMarkets] = useState("");

  const [messages, setMessages] = useState();

  const [formValue, setFormValue] = useState("");

  let date1;
  let date2;
  let date3;
  let date4;

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      date1 = a[property].seconds;
      date2 = b[property].seconds;
      date3 = a[property].nanoseconds;
      date4 = b[property].nanoseconds;
      var result =
        date1 < date2
          ? -1
          : date1 > date2
          ? 1
          : date3 < date4
          ? -1
          : date3 > date4
          ? 1
          : 0;
      return result * sortOrder;
    };
  }

  useEffect(() => {
    if (!localStorage.getItem("EMAIL").includes("@houseware")) {
      axios
        .get("http://localhost:4000/login/markets/")
        .then(({ data }) => {
          setMarkets(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (messages1 && messages2) {
      const intervalId = setInterval(() => {
        setMessages(
          [...messages1, ...messages2].sort(dynamicSort("createdAt"))
        );
      }, 300);
      return () => clearInterval(intervalId);
    }
  }, [messages1, messages2]);

  const handleMarket = (market) => {
    localStorage.setItem("EMAIL2", market.email);
    if (formValue === "") {
      setFormValue(" ");
    } else {
      setFormValue("");
    }

    console.log("Email2", localStorage.getItem("EMAIL2"));
    console.log("Email", localStorage.getItem("EMAIL"));
  };

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
      Toid: localStorage.getItem("EMAIL2"),
      photoURL: imageUrl,
    });

    setFormValue("");
    //  dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        <Row>
          <Col xs={2}>
            {markets !== "" &&
              markets.map((market, index) => {
                return (
                  <>
                    <a onClick={() => handleMarket(market)}>
                      <span
                        style={{
                          color: "white",
                          "max-width": "75px",
                        }}
                      >
                        <Avatar src={market.imageUrl}>{market.name}</Avatar>
                        <span>{market.name}</span>
                        <hr></hr>
                      </span>
                    </a>
                  </>
                );
              })}
          </Col>
          <Col xs={10}>
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          </Col>
        </Row>
      </main>
      <div> </div>
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
