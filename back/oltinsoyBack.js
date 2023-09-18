const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./src/shared/config");

const adminRoutes = require("./src/routes/forAdmin");
const bookRoutes = require("./src/routes/books");

const newsRoutes = require("./src/routes/news");
const sendMessageRoutes = require("./src/routes/sendmessage");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(bookRoutes);

app.use(sendMessageRoutes);

app.use(newsRoutes);

app.listen(config.port, () => {
  console.log(`Server ${config.port} - portda ishlayapti`);
});
