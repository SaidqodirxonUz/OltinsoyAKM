/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CardHeader, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import "./index.scss";
import * as React from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Rename the FormData instance to avoid conflict
let formData = new FormData();

const Books = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function fetchData() {
    try {
      const response = await axios.get("/books");
      const responseData = response.data.data; // Access the data array within the response

      setData(responseData); // Update the state with the data

      console.log(responseData[0], "bu birinchi data");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
          Kitoblar
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
                <div>Yuklanmoqda...</div>
              ) : Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                  <div className="card" key={item.id}>
                    <Card sx={{ maxWidth: 345, height: 400 }}>
                      <CardActionArea className="flex flex-col">
                        <CardMedia
                          style={{ height: "200px", objectFit: "cover" }}
                          component="img"
                          image={item.image_url}
                          alt="news img"
                        />
                        <div className="flex flex-row justify-start items-center px-6"></div>
                      </CardActionArea>
                      <CardContent>
                        <Typography
                          gutterBottom
                          className="card_title"
                          variant="h6"
                          component="p"
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className=""
                        >
                          {TextComponent({
                            text: item.description,
                            maxLength: 100,
                          })}
                        </Typography>
                      </CardContent>
                      <div className="downLinkDiv">
                        <a href={item.file} className="downLink">
                          Yuklash
                        </a>
                      </div>
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

export default Books;
