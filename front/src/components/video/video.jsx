/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";

import { CardActionArea } from "@mui/material";
import "./index.scss";
import * as React from "react";

import { TbCalendarEvent } from "react-icons/tb";

const Video = () => {
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
          Videolar
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
              <div className="card">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/JvOCkhWEj_Y?si=-_Uizm9diNEU3ZV0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="card">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/7jOufN2zwuc?si=7hyGV8Qa0MLdBcYs"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>

              <div className="card">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/BDLFamh0R10?si=i1yrtrIU7qdL12N7"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
