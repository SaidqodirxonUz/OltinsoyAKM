import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

// Components
import Header from "../Components/Header";
import Books from "../Components/Books";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) navigate("/login");
  }, []);

  return (
    <>
      <Header />
      <Books />
      <Footer />
    </>
  );
};

export default Home;
