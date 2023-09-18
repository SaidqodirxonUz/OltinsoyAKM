/* eslint-disable no-unused-vars */
import "./main.scss";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Hero from "../../components/hero/hero";
import Blog from "../../components/blog/blog";
import Books from "../../components/books/Books";
import Video from "../../components/video/video";

const Main = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="showcase">
        <Hero />
        <Blog />
        <Books />
        <Video />
        <Footer />
      </div>
    </div>
  );
};

export default Main;
