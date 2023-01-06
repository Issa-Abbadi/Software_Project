import React, { useState, useEffect } from "react";
import Nav from "./components/Nav_bar";
import Footer from "./components/footer";
import Sidebar from "./components/Sidebar";
import "./components/navbar.css";
import "./chatingSystem.css";
import {
  BrowserRouter as Router,
  Routes,
  BrowserRouter,
  Route,
  useNavigate,
} from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
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
import Analytics from "./Pages/Analytics";
import Admin from "./Pages/Admin";
import Product from "./Pages/Product";
import Logout from "./Pages/Logout";
import AllProducts from "./Pages/AllProducts";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import Markets from "./Pages/Markets";
import WishList from "./Pages/WishList";
import Notification from "./components/Notification";
// import { MuiBreadcrumbs } from "./components/Mui_Breadcrumbs";

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("EMAIL"));
  const [chat, setChat] = useState(false);
  const changeChat = () => {
    if (chat === false) {
      setChat(true);
    } else if (chat === true) {
      setChat(false);
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("EMAIL");
    if (data === null) {
    } else {
      setIsLogin(data);
    }
  }, [isLogin]);

  const setChating = () => {
    if (chat === false) setChat(true);
  };

  return (
    <>
      <Router>
        <header>
          <Nav login={isLogin} setChating={setChating} />
        </header>

        <div style={{ display: "flex" }}>
          <div
            style={{
              position: "relative",
              flex: "1",
              margin: "0% 2%",
              // maxWidth: "100%",
              minHeight: "700px",
            }}
          >
            {/* <MuiBreadcrumbs/> */}

            {localStorage.getItem("EMAIL") && (
              <MessageOutlinedIcon class="chatIcon" onClick={changeChat} />
            )}

            <Routes>
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/markets" element={<Markets />} />
              <Route exact path="/wishList" element={<WishList />} />

              <Route exact path="/product" element={<Product />} />

              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/forget-pass" element={<ForgetPassword />} />
              <Route exact path="/homeProducts" element={<HomeProducts />} />
              <Route
                exact
                path="/allProducts"
                element={<AllProducts props={{ type: "0" }} />}
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
              <Route
                exact
                path="/kitchenProducts"
                element={<KitchenProducts props={{ type: "0" }} />}
              />

              <Route exact path="/tableProducts" element={<TableProducts />} />
              <Route exact path="/otp" element={<NewSubmit />} />
              <Route exact path="/support" element={<Support />} />
              <Route exact path="/FAQ" element={<FAQ />} />
              <Route exact path="/aboutUs" element={<AboutUs />} />
              <Route exact path="/conditionsOfUse" element={<ConOfUse />} />
              <Route exact path="/privacy" element={<Privacy />} />
            </Routes>
          </div>
          {/* <Sidebar
            class="sideBar"
            style={{ flex: "20%", maxWidth: "20%" }}
          ></Sidebar> */}
        </div>

        <footer>
          {chat && (
            <>
              <div className="chatingSystem">
                <header>
                  <h1>⚛️🔥💬</h1>
                </header>

                <section>
                  {" "}
                  <ChatRoom />
                </section>
              </div>
              {/* <Notification /> */}
            </>
          )}
          <Footer />
        </footer>
      </Router>
    </>
  );
}

export default App;
