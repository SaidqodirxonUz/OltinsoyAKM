import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus } from "react-icons/ai";

const CreateBooks = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const selectedFiles = Array.from(files).slice(0, 2); // Limit to 2 files
    setImageFiles(selectedFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageFiles.length === 0) {
      toast.error("Rasm yuklash majburiy.", { type: "error" });
      return;
    }

    // Check if all image files are valid types
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/zip",
      "application/html",
      "application/text",
    ];
    const invalidImages = imageFiles.filter(
      (file) => !validImageTypes.includes(file.type)
    );

    if (invalidImages.length) {
      toast.error(
        "Invalid image type(s):" +
          invalidImages.map((file) => file.name).join(", "),
        {
          type: "error",
        }
      );
      return;
    }

    // Check if all image files are less than 2MB
    const maxImageSize = 50 * 1024 * 1024; // 2MB in bytes
    const largeImages = imageFiles.filter((file) => file.size > maxImageSize);

    if (largeImages.length) {
      toast.error(
        "Image size too large: " +
          largeImages.map((file) => file.name).join(", "),
        {
          type: "error",
        }
      );
      return;
    }

    const formDataWithImage = new FormData();

    imageFiles.forEach((file, index) => {
      formDataWithImage.append("files", file);
    });

    formDataWithImage.append("title", formData.title);
    formDataWithImage.append("description", formData.description);

    try {
      setIsUploading(true);

      const response = await axios.post("/books", formDataWithImage, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("books added:", response.data.data);
      toast("Qoshildi", { type: "success" });
      navigate("/books");
    } catch (error) {
      console.error("Error adding book:", error);

      if (error.response) {
        console.log("Server Response Data:", error.response.data);
        console.log("Status Code:", error.response.status);

        if (error.response.status === 500) {
          toast("Xatolik yuz berdi, iltimos qayta urinib ko'ring.", {
            type: "error",
          });
        } else {
          toast(error.response.data.message, { type: "error" });
        }
      } else {
        toast("Xatolik yuz berdi, iltimos qayta urinib ko'ring.", {
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
          <h2>Kitob qoshish</h2>
          <Link to={`/books`} className="btn btn-primary col-2 me-1">
            <AiFillBackward />
            Barcha Kitoblar
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
              value={formData.description}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Rasm<span className="text-danger"> Majburiy</span> :
              <br />
              <span className="text-danger">
                Birdaniga ikkita file yuklang bulardan biri rasm uchun
                ikkinchisi esa kitob fayliga yoziladi
                <br />
                Kitob fayli uchun ruhsat berilgan typelar .zip .rar .xlsx .doc
                .html .pdf .txt
              </span>
            </label>

            <input
              type="file"
              id="image"
              accept=".zip, .rar, .xlsx, .doc, .html, .pdf, .txt, image/*"
              onChange={handleImageChange}
              multiple
              className="form-control"
              required
            />
          </div>
          <div>
            {isUploading && <p>Yuklanmoqda, biroz kuting ...</p>}
            <button
              type="submit"
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

export default CreateBooks;
