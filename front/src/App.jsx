/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/main/main";
import News_info from "./pages/news_info/news_info";
import NotFound from "./pages/404page/404";
import Contact from "./pages/contact/contact";
import Dev from "./components/dev/dev";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />

      <Route path="/news/:id" element={<News_info />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/dev" element={<Dev />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
