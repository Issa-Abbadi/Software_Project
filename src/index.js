import React from "react";
import ReactDOM from "react-dom/client";
//
// import "mdb-react-ui-kit/dist/css/mdb.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App";

// import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

{
  /* <Auth0Provider
    domain="dev-0yvakzvo.us.auth0.com"
    clientId="CX8gMrNqzkkGr2qPXPQGbDgjWhrDS9BU"
    redirectUri={window.location.origin}
  ></Auth0Provider> */
}
