import React, { useState } from "react";
import Nav from "./components/Nav_bar";
import Footer from "./components/footer";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Pages/Home";

import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Router>
        <header>
          <Nav />
        </header>

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/about" element={<About />} />

          <Route exact path="/profile" element={<Profile />} />

          <Route exact path="/cart" element={<Cart />} />

          <Route exact path="/login" element={<Login />} />
          {/* <Navigate to="/" replace={true} /> */}
        </Routes>

        <footer>
          <Footer />
        </footer>
      </Router>
    </>
  );
}

export default App;
