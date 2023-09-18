import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillEdit,
  AiFillEye,
  AiFillDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import useBooks from "../Hooks/useBooks"; // useBooks faylini to'g'ri joyga o'rnating

const NewBooks = () => {
  const [books, loading, deleteBooks] = useBooks();
  const [error, setError] = useState(null); // Add state to handle errors

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Siz Haqiqatdan ham ushbu kitobni ochirmoqchimisiz")) {
        await deleteBooks(id);
      }
    } catch (error) {
      setError(error.message); // Set the error message in case of failure
    }
  };
  console.log(loading);
  if (loading) {
    return <div>Yuklanmoqda ...</div>;
  }
  if (!books || !Array.isArray(books) || books.length === 0) {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h2>Hozircha Kitob qoshilmagan</h2>
          <Link to={`/createBooks`} className="btn btn-primary col-2 me-1">
            <AiOutlinePlus /> Kitob qoshish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-3">
      <div className="d-flex justify-content-between">
        <h2>Kitoblar</h2>
        <Link to={`/createBooks`} className="btn btn-primary col-2 me-1">
          <AiOutlinePlus />
          Kitob qoshish
        </Link>
      </div>
      {books.map((Books) => (
        <div key={Books.id} className="col-md-6 col-lg-3">
          <div className="card overflow-hidden" aria-hidden="true">
            <img
              src={Books.image_url}
              alt={Books.image_url}
              className="card-image-top placeholder-card-image"
            />
            <div className="card-body">
              <p className="card-text">
                ID : {Books.id}
                <span className="d-flex justify-content-between align-items-center">
                  <span className="text-danger">
                    Sarlavhasi : {Books.title}
                  </span>
                </span>
              </p>
              <div className="d-flex g-3">
                <Link
                  to={`/editBooks/${Books.id}`}
                  className="btn btn-warning col-4 me-1"
                >
                  <AiFillEdit />
                </Link>
                <Link
                  to={`/books/${Books.id}`}
                  className="btn btn-primary col-4 me-1"
                >
                  <AiFillEye />
                </Link>
                <button
                  onClick={() => {
                    handleDelete(Books.id);
                  }}
                  className="btn btn-danger col-4 me-1"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewBooks;
