import { Routes, Route } from "react-router-dom";
import Redirect from "./Components/Redirect.jsx";

import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";

import News from "./Pages/News.jsx";
import CreateNews from "./Components/createNews.jsx";
import Newsdetails from "./Components/NewsDetails.jsx";
import EditNews from "./Components/EditNews.jsx";
//
import EditAdmin from "./Components/editAdmin.jsx";
//
import CreateBooks from "./Components/createBook.jsx";
import Bookdetails from "./Components/BooksDetails.jsx";
import EditBook from "./Components/EditBook.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/books" element={<Books />} /> */}
        <Route path="/createBooks" element={<CreateBooks />} />
        <Route path="/books/:id" element={<Bookdetails />} />
        <Route path="/editBooks/:id" element={<EditBook />} />

        <Route path="/news" element={<News />} />
        <Route path="/createNews" element={<CreateNews />} />
        <Route path="/news/:id" element={<Newsdetails />} />
        <Route path="/editNews/:id" element={<EditNews />} />

        <Route path="/editAdmin" element={<EditAdmin />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Redirect />} />
      </Routes>
    </div>
  );
}

export default App;
