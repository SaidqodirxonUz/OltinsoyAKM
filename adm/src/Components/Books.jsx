import React from "react";
import PlaceholderCards from "./PlaceholderCards";
import NewsBooks from "./NewsBook";
import useBooks from "../Hooks/useBooks";

const Books = () => {
  const [news, loading] = useBooks();

  return (
    <div className="container py-3">
      {loading ? <PlaceholderCards /> : <NewsBooks news={news} />}
    </div>
  );
};

export default Books;
