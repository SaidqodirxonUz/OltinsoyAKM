/* eslint-disable no-undef */
const express = require("express");
const path = require("path");

const app = express();

const distPath = path.join(__dirname, "dist");
const images = path.join(__dirname, "../../back/public");

app.use(express.static(distPath));
app.use(express.static(images));

console.log(images);

app.get("/", (req, res) => {
  const distHtmlPath = path.join(distPath, "index.html");
  res.sendFile(distHtmlPath);
});

app.get("/*", (req, res) => {
  const distHtmlPath = path.join(distPath, "index.html");
  res.sendFile(distHtmlPath);
});

app.listen(4002, () => {
  console.log("Frontend ishlayapti, 4002-portni eshitishni kutamiz...");
});
