import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus } from "react-icons/ai";

const CreateNews = () => {
  const navigate = useNavigate();
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      toast.error("Rasm yuklash majburiy.", { type: "error" });
      return;
    }

    const formDataWithImage = new FormData();
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }

    formDataWithImage.append("image", imageFile);

    try {
      setIsUploading(true);

      const response = await axios.post("/news", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("news added:", response.data.data);
      toast("Qoshildi", { type: "success" });
      navigate("/news");
    } catch (error) {
      console.log("Error adding category:", error.message);
      //   toast(error.message, { type: "error" });

      if (error.message) {
        console.log("Server Response Data:", error.response.data);
        console.log("Status Code:", error.response.status);
        toast("Yangilik qoshishda xatolik", { type: "error" });
      }
      if (
        error.message ==
        'Произошла ошибка error: insert into "images" ("filename", "image_url") values ($1, $2) returning "id", "image_url", "filename" - duplicate key value violates unique constraint "images_filename_unique"'
      ) {
        toast("Ushbu rasm oldin yuklangan", { type: "error" });
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
          <h2>Yangilik qoshish</h2>
          <Link to={`/news`} className="btn btn-primary col-2 me-1">
            <AiFillBackward />
            Barcha yangiliklar
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Sarlavasi <span className="text-danger">Majburiy</span> :
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Malumot <span className="text-danger">Majburiy</span> :
            </label>
            <input
              type="text"
              id="description"
              name="description"
              // value={formData.desc_en}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Rasm<span className="text-danger"> Majburiy</span> :
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
              required
            />
          </div>
          <div>
            {isUploading && <p>Yuklanmoqda, biroz kuting ...</p>}
            <button
              type="submit" // Changed to type="submit"
              className="btn btn-primary mb-5 col-3 me-1"
              disabled={isUploading}
            >
              Qoshish
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateNews;
