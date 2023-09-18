import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add state to handle errors

  useEffect(() => {
    let unmounted = false;

    async function getBooks() {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors

        const res = await axios.get("/books");
        if (unmounted) return;

        if (res.status === 200) setBooks(res.data.data);
      } catch (error) {
        setError("An error occurred while fetching books."); // Set a generic error message
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getBooks();

    return () => {
      unmounted = true;
    };
  }, []);

  async function deleteBooks(id) {
    try {
      const options = {
        method: "DELETE",
        url: `/books/${id}`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const res = await axios(options);
      if (res.status === 200) {
        // Remove the deleted category from the books state
        setBooks((prevBooks) =>
          prevBooks.filter((category) => category.id !== id)
        );

        toast.info("Kitob ochirildi");
      }
    } catch (error) {
      setError("An error occurred while deleting the book.");
      toast.error(error.message);
      console.log(error);
    }
  }

  return [books, loading, deleteBooks, error]; // Include the error in the return value
}

export default useBooks;
