import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "./Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillBackward, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";

const EditNews = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",

    // image: null,
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
    // console.log(event.target.files[0], "file");
    setImageFile(event.target.files[0]);
    console.log(imageFile);
  };

  useEffect(() => {
    async function fetchCategoriesDetails() {
      try {
        const response = await axios.get(`/news/${id}`);
        console.log(response.data.data, "res");
        const dealerData = {
          title: response.data.data.title,
          description: response.data.data.description,
        };
        console.log(dealerData);
        setFormData(dealerData);
        toast.success("Muvaffaqiyatli");
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    }

    if (id) {
      fetchCategoriesDetails();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataWithImage = new FormData();
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }
    console.log(imageFile, "img");
    if (imageFile) {
      formDataWithImage.append("image", imageFile);
    }

    try {
      setIsUploading(true);

      const response = await axios.patch(`/news/${id}`, formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",

          Authorization: localStorage.getItem("token"),
        },
      });

      toast.success("Успешно изменено");
      navigate("/news");
    } catch (error) {
      console.log("Error updating category:", error);

      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
      }
      if (error.response.data.error == "Unauthorized.") {
        toast("Пожалуйста, авторизоваться еще раз.", {
          type: "error",
        });
        navigate("/login");
      }

      toast("Что-то пошло не так. Пожалуйста, попробуйте еще раз.", {
        type: "error",
      });
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
          <Link to="/news" className="btn btn-primary col-2 me-1">
            <AiFillBackward /> Barcha yangiliklar
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
            <input
              type="file"
              id="image"
              name="image" // Add name attribute for file upload
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>
          <div>
            {isUploading && <p>Загрузка...</p>}
            <button
              type="submit" // Changed to type="submit"
              className="btn btn-primary mb-5 col-3 me-1"
              disabled={isUploading}
            >
              <AiOutlineSave /> Сохранять
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditNews;
