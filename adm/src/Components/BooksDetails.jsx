import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Bookdetails = () => {
  const { id } = useParams();
  const [books, setBooks] = useState({});

  useEffect(() => {
    axios
      .get(`/books`)
      .then((response) => {
        console.log(id);
        console.log(response.data);
        let booksData = response.data.data.filter((e) => {
          console.log(e, "e");

          if (e.id == id) return e;
        });
        console.log(booksData[0], "booksdata");
        setBooks(booksData[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  console.log(books, "state");
  return (
    <>
      <Header />
      <div className="container">
        <div className="row g-3 mb-5">
          <div className="col-12 h-100 pt-5">
            <div className="card overflow-hidden" aria-hidden="true">
              <img
                src={books.image_url}
                className="placeholder-card-image d-flex align-items-center justify-content-center card-image-top bg-light"
                alt=""
              />

              <div className="card-body">
                <div className="card-text">
                  <h5 className="news-description my-3">ID : {books.id}</h5>
                </div>
                <h3 className="card-title text-truncate">
                  Sarlavhasi : {books.title}
                </h3>

                <div className="d-flex g-3 row">
                  <p className="text-secondary ">
                    Malumot : {books.description}
                  </p>
                  <div className="col-6 d-flex justify-content-between">
                    {/* <h6 className="fs-2">{books.category}</h6> */}
                  </div>
                  <div className="col-6"></div>
                </div>
              </div>
            </div>

            <Link
              to={"/books"}
              className="btn btn-primary w-25 d-flex justify-content-center m-auto fs-6 mt-5"
            >
              <i className="fa-solid fa-arrow-left d-flex justify-content-center m-1"></i>{" "}
              ortga{" "}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bookdetails;
