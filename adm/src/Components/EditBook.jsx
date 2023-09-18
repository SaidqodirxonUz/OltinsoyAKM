import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillBackward, AiOutlineSave } from "react-icons/ai";

const EditBook = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const response = await axios.get(`/books/${id}`);
        const bookData = {
          title: response.data.data.title,
          description: response.data.data.description,
        };
        setFormData(bookData);
        toast.success("Muvaffaqiyatli");
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    }

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append("title", formData.title);
    formDataWithImage.append("description", formData.description);

    if (imageFile) {
      formDataWithImage.append("files", imageFile);
    }

    try {
      setIsUploading(true);

      const response = await axios.patch(`/books/${id}`, formDataWithImage, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data", // Set the content type
        },
      });

      if (response.status === 200) {
        toast.success("Успешно изменено");
        navigate("/");
      } else {
        toast.error("Что-то пошло не так. Пожалуйста, попробуйте еще раз.", {
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error updating book:", error);

      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
      }

      if (error.response && error.response.status === 401) {
        toast("Пожалуйста, авторизуйтесь снова.", {
          type: "error",
        });
        navigate("/login");
      } else {
        toast("Что-то пошло не так. Пожалуйста, попробуйте еще раз.", {
          type: "error",
        });
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-between mb-5">
          <h2>Tahrirlash id:{id} </h2>
          <Link to="/book" className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Barcha Kitoblar
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Sarlavhasi :
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Malumot :
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Rasm :
            </label>
            <br />
            <span className="text-danger">
              Agar siz Kitob yuklasangiz kitob rasm yuklasangiz rasm ozgaradi
              <br />
              Kitob fayli uchun ruhsat berilgan typelar .zip .rar .xlsx .doc
              .html .pdf .txt
            </span>
            <input
              type="file"
              id="image"
              name="image"
              accept=".zip, .rar, .xlsx, .doc, .html, .pdf, .txt, image/*"
              // multiple
              onChange={handleImageChange}
              className="form-control"
            />
          </div>
          <div>
            {isUploading && <p>Yuklanmoqda...</p>}
            <button
              type="submit"
              className="btn btn-primary mb-5 col-3 me-1"
              disabled={isUploading}
            >
              <AiOutlineSave /> Saqlash
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditBook;
