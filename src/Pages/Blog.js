import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import MainFeaturedPost from "../components/MainFeaturedPost";
import FeaturedPost from "../components/FeaturedPost";
import Main from "../components/Main";
import Sidebar from "../components/SidebarBlog";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import { Avatar } from "@mui/material";
import Rating from "../components/Rating";
import PriceChart from "../components/PriceChart";
import { Alert } from "@mui/material";
import "./Cart.css";
import "./Home.css";

import {
  faStar,
  faStarHalf,
  faStarHalfAlt,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const imgs = [
  {
    url: "https://scontent.fjrs2-2.fna.fbcdn.net/v/t39.30808-6/258858975_128997442883312_6254727363737905622_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jQjghrMwSpQAX_6396z&_nc_ht=scontent.fjrs2-2.fna&oh=00_AfAH3pBtf23HXNt1om11kjajDtzs34_W_DEdOpbDjUovTQ&oe=63C7EC17",
  },
  {
    url: "https://scontent.fjrs2-2.fna.fbcdn.net/v/t39.30808-6/258858975_128997442883312_6254727363737905622_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jQjghrMwSpQAX_6396z&_nc_ht=scontent.fjrs2-2.fna&oh=00_AfAH3pBtf23HXNt1om11kjajDtzs34_W_DEdOpbDjUovTQ&oe=63C7EC17",
  },
  {
    url: "https://scontent.fjrs2-2.fna.fbcdn.net/v/t39.30808-6/258858975_128997442883312_6254727363737905622_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jQjghrMwSpQAX_6396z&_nc_ht=scontent.fjrs2-2.fna&oh=00_AfAH3pBtf23HXNt1om11kjajDtzs34_W_DEdOpbDjUovTQ&oe=63C7EC17",
  },
  {
    url: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    url: "https://images.unsplash.com/photo-1501924497965-792fefaea3dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
  },
];

const theme = createTheme();

export default function Blog(props) {
  function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    return (
      <div style={{ height: "100%", overflow: "hidden" }}>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          variant="dark"
          style={{ display: "flex" }}
        >
          <Carousel.Item
            interval={1500}
            style={{ height: "100%", overflow: "hidden" }}
          >
            <img
              className="cover d-block w-100"
              src={product.cover_img1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="cover d-block w-100"
              src={product.cover_img2}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="cover d-block w-100"
              src={product.cover_img3}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }

  const Stars = (rating) => {
    const starArray = [...Array(5).keys()].map((i) => i + 1);
    return starArray.map((i) => {
      if (rating >= i) {
        return <FontAwesomeIcon key={i} icon={faStar} color={"orange"} />;
      } else if (rating >= i - 0.5) {
        return (
          <FontAwesomeIcon key={i} icon={faStarHalfAlt} color={"orange"} />
        );
      } else {
        return <></>;
      }
    });
  };
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const config = isMatch ? "500px" : "100%";
  const addtoCart = () => {
    axios
      .post("http://localhost:4000/login/addtoCart", {
        email: localStorage.getItem("EMAIL"),
        _id: product.product._id,
        var: productVar,
        quantity: 1,
        price: productPrice,
      })
      .then((res) => {
        if (res.data.code === 500) {
          setCode(500);
        }
        if (res.data.code === 404) {
          setCode(404);
        }
        if (res.data.code === 200) {
          setCode(200);
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  const [newRating, setNewRating] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/login/addReview", {
        name: product.name,
        review: "",
        rating: newRating,
        email: localStorage.getItem("EMAIL"),
        name: JSON.parse(localStorage.getItem("Profile")).name,
      })
      .then(() => {
        setCode(222);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [productImg, setProductImg] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productVar, setProductVar] = useState(0);
  const [code, setCode] = useState(0);

  const location = useLocation();
  const [product, setProduct] = useState({ product: "" });

  const addProduct = () => {
    localStorage.setItem("cart", product.product._id);
    console.log("added to cart ");
  };
  React.useEffect(() => {
    if (location.state) {
      let _state = location.state;
      setProduct(_state.product);
      console.log("Hello", _state.product);
    }
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="lg">
        <div class="storeTitle">
          <div>
            <Header
              title={product.name}
              sections={sections}
              class="storeName"
            />
            {Stars(product.market_rating)}
          </div>

          <img src={product.imageUrl} alt="" class="storeLogo" />
        </div>

        <main>
          <div
            style={{
              overflow: "hidden",
              height: "100%",
              width: config,
            }}
          >
            <a href="">
              <ControlledCarousel />
            </a>
          </div>

          <div>
            {/* <h2 style={{"direction":"rtl",marginTop:"2%",}}>عن متجرنا</h2> */}

            <span class="aboutUsStore">عن متجرنا</span>
            <p>{product.market_description}</p>
            <span class="ourSite">موقعنا </span>

            <iframe
              width="600"
              height="363"
              id="gmap_canvas"
              src={product.location}
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </div>
          <div>{product.email && <PriceChart email={product.email} />}</div>
          <div style={{ direction: "rtl" }} class="reviews">
            <h3> قيم المتجر </h3>

            <form onSubmit={handleSubmit} class="writeRev">
              <div>
                <Rating rating={newRating} setNewRating={setNewRating} />
              </div>

              <button
                type="submit"
                class="sendReview"
                style={{ height: "50px", margin: "1.5%" }}
              >
                إرسال التقييم
              </button>
            </form>
          </div>
          {code === 222 && (
            <div>
              <Alert severity="success">تم تخزين التقييم بنجاح </Alert>
            </div>
          )}

          {/* <MainFeaturedPost post={mainFeaturedPost} /> */}

          {/* 
           <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>  */}

          {/* <Grid container spacing={5} sx={{ mt: 3 }}>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid> */}
        </main>
      </Container>
    </ThemeProvider>
  );
}
