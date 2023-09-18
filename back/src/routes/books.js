const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn } = require("../shared/auth");
const {
  postBooksSchema,
  patchBooksSchema,
} = require("../controllers/books/schemas");
const BooksController = require("../controllers/books");
const upload = require("../uploads");

const router = express.Router();

const mPostBooks = [
  isLoggedIn,
  genValidator(postBooksSchema),
  upload.array("files"),
];
const mPatchBooks = [
  isLoggedIn,
  genValidator(patchBooksSchema),
  upload.array("files"),
];
const mDeleteBooks = [isLoggedIn];

router.post("/books", mPostBooks, BooksController.postBooks);
router.get("/books", BooksController.getBooks);
router.get("/books/:id", BooksController.showBooks);
router.patch("/books/:id", mPatchBooks, BooksController.patchBooks);
router.delete("/books/:id", mDeleteBooks, BooksController.deleteBooks);

module.exports = router;
