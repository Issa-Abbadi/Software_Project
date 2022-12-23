import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
var firebaseConfig = {
  apiKey: "AIzaSyCgLBah0eGYaTVSqc_kfdv4tCGeOiHA2ZQ",
  authDomain: "chat-system-67034.firebaseapp.com",
  projectId: "chat-system-67034",
  storageBucket: "chat-system-67034.appspot.com",
  messagingSenderId: "123521492390",
  appId: "1:123521492390:web:0c70c6a21c66c60ee15b67",
  measurementId: "G-E0KBFPD6JL",
};
initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const gettoken = (setTokenFound) => {
  alert("in");
  return getToken(messaging, {
    vapidKey:
      "BA2_cdMytte9XJ5CbktQPF3C1-OFBZMQEwsyDerwjT7Mdf_thieG3H-kicb2cVuVORAIA58zz-eo9Y8aLjgkCro",
  })
    .then((currentToken) => {
      if (currentToken) {
        alert("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        alert(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      alert("An error occurred while retrieving token. ");
      console.log(err);
      // catch error while creating client token
    });
};