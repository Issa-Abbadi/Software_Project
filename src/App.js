import React, { useState } from "react";
import Nav from "./components/Nav_bar";
import Footer from "./components/footer";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Home from "./Pages/Home";

import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgetPassword from "./Pages/ForgetPassword";
import NewSubmit from "./Pages/NewSubmit";
import HomeProducts from "./Pages/HomeProducts";
import KitchenProducts from "./Pages/KitchenProducts";
import TableProducts from "./Pages/TableProducts";
import Support from "./Pages/Support";
import FAQ from "./Pages/FAQ";
import AboutUs from "./Pages/AboutUs";
import ConOfUse from "./Pages/ConditionsOfUse";
import Privacy from "./Pages/Privacy";

function App() {
  return (
    <>
      <Router>
        <header>
          <Nav />
        </header>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/forget-pass" element={<ForgetPassword />} />
          <Route exact path="/homeProducts" element={<HomeProducts />} />
          <Route
            exact
            path="/kitchenProducts"
            element={<KitchenProducts props={{ type: "0" }} />}
          />
          <Route
            exact
            path="/kitchenProducts/kitchen-accessories"
            element={<KitchenProducts props={{ type: "1" }} />}
          />

          <Route
            exact
            path="/kitchenProducts/cooking-tools"
            element={<KitchenProducts props={{ type: "2" }} />}
          />
          <Route
            exact
            path="/kitchenProducts/distribution"
            element={<KitchenProducts props={{ type: "3" }} />}
          />
          <Route exact path="/tableProducts" element={<TableProducts />} />
          <Route exact path="/otp" element={<NewSubmit />} />
          <Route exact path="/support" element={<Support />} />
          <Route exact path="/FAQ" element={<FAQ />} />
          <Route exact path="/aboutUs" element={<AboutUs />} />
          <Route exact path="/conditionsOfUse" element={<ConOfUse />} />
          <Route exact path="/privacy" element={<Privacy />} />
        </Routes>

        <footer>
          <Footer />
        </footer>
      </Router>
    </>
  );
}

export default App;
