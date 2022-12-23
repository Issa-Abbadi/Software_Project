// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCgLBah0eGYaTVSqc_kfdv4tCGeOiHA2ZQ",
  authDomain: "chat-system-67034.firebaseapp.com",
  projectId: "chat-system-67034",
  storageBucket: "chat-system-67034.appspot.com",
  messagingSenderId: "123521492390",
  appId: "1:123521492390:web:0c70c6a21c66c60ee15b67",
  measurementId: "G-E0KBFPD6JL",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
