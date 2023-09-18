const { default: knex } = require("knex");
const db = require("../../db");
const { BadRequestErr, NotFoundErr } = require("../../shared/errors");
const { siteUrl } = require("../../shared/config");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getBooks = async (req, res, next) => {
  // console.log(db("categories"));
  try {
    const Books = await db("books")
      .leftJoin("images", "images.id", "books.img_id")
      .select(
        "books.id",
        "books.title",
        "books.description",
        "books.file",

        "images.image_url"
      )
      .groupBy("books.id", "images.id");
    console.log(Books);

    return res.status(200).json({
      message: "success",
      data: [...Books],
    });
  } catch (error) {
    console.log(error);
    throw new BadRequestErr("Xatolik yuz berdi");
    // res.status(400).json({
    //   status: 503,
    //   errMessage: `Serverda xato ${error}`,
    // });
  }
};
const showBooks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const books = await db("books")
      .where({ id })
      .select(
        "id",
        "title",
        "description",
        "file",

        "img_id"
      )
      .first();
    if (!books) {
      return res.status(400).json({
        error: `${id} Kitob topilmadi`,
      });
    }
    // console.log(category);
    if (books.img_id) {
      let id = books.img_id;
      console.log(books.img_id);
      imgUrl = await db("images").where({ id }).select("image_url");
      console.log(imgUrl);
      return res.status(201).json({
        message: "success",
        data: { ...books, ...imgUrl[0] },
      });
    }

    return res.status(201).json({
      message: "success",
      data: { ...books },
    });
  } catch (error) {
    // throw new BadRequestErr("Произошла ошибка", error);
    next(error);
  }
};

const postBooks = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    console.log(req.files);

    const bookFiles = [];
    const imageFiles = [];

    if (!req.files) {
      return res.status(400).json({
        message: "No files uploaded.",
      });
    }

    req.files.map((item) => {
      if (item.mimetype == "application/pdf") {
        console.log("bu pdf");
        bookFiles.push(item);
      } else if (
        item.mimetype ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        console.log("bu excel");
        bookFiles.push(item);
      } else if (item.mimetype == "application/vnd.rar") {
        console.log("bu rar");
        bookFiles.push(item);
      } else if (item.mimetype == "application/zip") {
        console.log("bu zip");
        bookFiles.push(item);
      } else if (item.mimetype == "application/html") {
        console.log("bu html");
        bookFiles.push(item);
      } else if (item.mimetype == "application/text") {
        console.log("bu text");
        bookFiles.push(item);
      } else if (
        item.mimetype ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        console.log("bu word");
        bookFiles.push(item);
      } else {
        // If it doesn't match any of the specified types, assume it's an image
        imageFiles.push(item);
      }
    });

    let imageFile = null;
    let bookFile = null;

    if (imageFiles.length > 0) {
      // Assuming you want to save the first image if there are multiple images
      imageFile = imageFiles[0];
    }

    if (bookFiles.length > 0) {
      // Assuming you want to save the first matching book file if there are multiple book files
      bookFile = bookFiles[0];
    }

    let image = null;
    let book = null;

    if (imageFile) {
      // Save imageFile to the "images" table in the database
      image = await db("images")
        .insert({
          filename: imageFile.filename,
          image_url: `${siteUrl}/${imageFile.filename}`,
        })
        .returning(["id", "image_url", "filename"]);
    }

    if (bookFile) {
      // Save bookFile to the "books" table in the database
      book = await db("books")
        .insert({
          title,
          description,
          img_id: image ? image[0].id : null,
          file: `${siteUrl}/${bookFile.filename}`,
        })
        .returning(["*"]);
    } else {
      book = await db("books")
        .insert({
          title,
          description,
          img_id: image ? image[0].id : null,
        })
        .returning(["*"]);
    }

    res.status(200).json({
      data: {
        book: book[0],
        image: image ? image[0] : null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: `Произошла ошибка ${error}`,
    });
  }
};

const patchBooks = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;

    const existing = await db("books").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} Kitob topilmadi`,
      });
    }

    // Get the file from the request
    const files = req.files || [req.files[0]]; // Make sure it's an array

    let image = null;
    let updatedData = { ...changes };

    console.log(req.files, "req.files");

    if (files && files[0] && !files[0].mimetype.startsWith("image/")) {
      if (files[0]) {
        updatedData = {
          ...updatedData,
          file: `${siteUrl}/${files[0].filename}`,
        };

        console.log(updatedData, "ifga kirdi");
      }
    } else if (
      files[0].mimetype.startsWith("image/") ||
      files.mimetype.startsWith("image/")
    ) {
      const existingImage = await db("images")
        .where({ filename: files[0].filename })
        .first();

      console.log(existingImage, "existing");
      console.log(files, "bu files");

      if (files === null) {
        image = existingImage;
      } else {
        console.log("elsega kirdi");
        image = await db("images")
          .insert({
            filename: files[0].originalname,
            image_url: `${siteUrl}/${files[0].filename}`,
          })
          .returning(["id", "image_url", "filename"]);
      }

      console.log(image, "bu elsedagi image");
    } else {
      console.log("xato else ishladi");
      return false;
    }

    // console.log(image[0].id, "bu 0");
    console.log(image, "bu img");
    console.log(existing.img_id, "existing");

    // Update the book data with the updatedData object
    const updated = await db("books")
      .where({ id })
      .update({
        ...updatedData,
        img_id: image ? image[0].id : existing.img_id,
      })
      .returning(["id", "title", "description", "file", "img_id"]);

    console.log(updated, "update");

    res.status(200).json({
      updated: {
        book: updated,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: `Xato ${error}`,
    });
  }
};

const deleteBooks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("books").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} Category не найдено`,
      });
    }

    const del = await db("books").where({ id }).returning(["*"]).del();

    res.status(200).json({
      message: "Удалено успешно",
      deleted: del,
    });
  } catch (error) {
    console.log(error);
    // throw new BadRequestErr("Something went wrong!", error);

    res.status(400).json({
      message: `Произошла ошибка ${error}`,
    });
  }
};
module.exports = {
  getBooks,
  postBooks,
  showBooks,
  patchBooks,
  deleteBooks,
};
