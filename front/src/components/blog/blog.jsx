/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CardHeader, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import "./index.scss";
import * as React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { TbCalendarEvent } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function fetchData() {
    try {
      const response = await axios.get("/news");
      setBlogData(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false in case of an error
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const TextComponent = ({ text, maxLength }) => {
    if (text.length > maxLength) {
      text = text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const DateComponent = ({ text, maxLength }) => {
    if (text.length > maxLength) {
      text = text.slice(0, maxLength) + "";
    }
    text = text.replaceAll("-", "/");

    return text;
  };

  return (
    <div className="products_container" style={{ padding: "2rem 0 2rem 0" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h2"
          component="h3"
          style={{
            fontFamily: "Okta Neue",
            fontSize: "36px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            background:
              "var(--liniar, linear-gradient(90deg, #052438 0%, #186BA3 100%))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "5rem 0 ",
          }}
        >
          Yangiliklar
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      ></div>
      <div className="blog">
        <div className="blog_container">
          <div className="outer">
            <main className="flex-container" id="flex-container">
              {loading ? (
                <div>Yuklanmoqda ..</div>
              ) : blogData.length > 0 ? (
                blogData.map((item) => (
                  <div
                    className="card"
                    key={item.id}
                    onClick={() => {
                      navigate(`/news/${item.id}`);
                    }}
                  >
                    <Card sx={{ maxWidth: 345, height: 400 }}>
                      <CardActionArea className="flex flex-col ">
                        <CardMedia
                          style={{ height: "200px", objectFit: "cover" }}
                          component="img"
                          image={item.image_url}
                          alt="news img"
                        />
                        <div className="flex flex-row justify-start items-center pl-6">
                          <TbCalendarEvent />
                          <CardHeader
                            className=""
                            subheader={DateComponent({
                              text: item.created_at,
                              maxLength: 10,
                            })}
                          ></CardHeader>
                        </div>
                        <CardContent>
                          <Typography
                            gutterBottom
                            className="news_title"
                            variant="h6"
                            component="p"
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="news_description"
                          >
                            {TextComponent({
                              text: item.description,
                              maxLength: 100,
                            })}
                          </Typography>

                          <Link
                            className="news_more"
                            to={`/news/${item.id}`}
                            style={{ color: "blue" }}
                          >
                            Batafsil ...
                          </Link>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                ))
              ) : (
                <div>Hozircha malumot yoq.</div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
