const { default: knex } = require("knex");
const db = require("../../db/index");
const { siteUrl } = require("../../shared/config");
// const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getNews = async (req, res, next) => {
  try {
    const a = await db.select().from("news");
    const news = await db("news")
      .leftJoin("images", "images.id", "news.img_id")
      .select(
        "news.id",
        //
        "news.title",
        "news.description",

        "news.created_at",
        //
        "images.image_url"
      )
      .groupBy("news.id", "images.id");

    console.log(news);
    res.json(news);
  } catch (error) {
    console.log("err shu yerdan");
    throw error;
  }
};
const showNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const news = await db("news")
      // .leftJoin("images", "images.id", "news.img_id")
      .select(
        "id",
        //
        "title",
        "description",

        "created_at",

        "img_id"
      )
      .where({ "news.id": id })
      // .groupBy("news.id", "images.id")
      .first();
    if (!news) {
      return res.status(404).json({
        error: `${id} не найдено`,
      });
    }
    if (news.img_id) {
      let id = news.img_id;
      console.log(news.img_id);
      imgUrl = await db("images").where({ id }).select("image_url");
      console.log(imgUrl);
      return res.status(201).json({
        message: "success",
        data: { ...news, ...imgUrl[0] },
      });
    }

    return res.status(200).json({
      message: "success",
      data: news,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

const patchNews = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("news").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} не найдено`,
      });
    }

    let oldImgId = null;

    console.log(oldImgId);

    oldImgId = existing.img_id;

    if (req.file?.filename) {
      let image = null;
      let filename = req.file?.filename;
      if (filename) {
        image = await db
          .insert({
            filename,

            image_url: `${siteUrl}/${filename}`,
          })
          .into("images")
          .returning(["id", "image_url", "filename"]);
      }
      const updated = await db("news")
        .where({ id })
        .update({ ...changes, img_id: { image }.image[0]?.id || image })
        .returning([
          "id",
          //
          "title",
          "description",

          "img_id",

          "created_at",

          //
        ]);
      res.status(200).json({
        updated: updated[0],
        ...image,
      });
    } else if (oldImgId !== null || oldImgId !== "" || oldImgId !== undefined) {
      const updated = await db("news")
        .where({ id })
        .update({ ...changes, img_id: oldImgId })
        .returning([
          "id",
          //
          "title",
          "description",

          "img_id",

          "created_at",
        ]);
      res.status(200).json({
        updated: updated[0],
      });
    } else {
      const updated = await db("news")
        .where({ id })
        .update({ ...changes, img_id: null })
        .returning([
          "id",
          //
          "title",
          "description",

          "img_id",

          "created_at",
        ]);
      res.status(200).json({
        updated: updated[0],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

const postNews = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    // console.log(news);
    if (req.file?.filename) {
      //  const { filename } = req.file;
      let filename = req.file?.filename;

      const image = await db("images")
        .insert({
          filename,
          image_url: `${siteUrl}/${filename}`,
        })
        .returning(["id", "image_url", "filename"]);
      const news = await db("news")
        .insert({
          title,
          description,

          img_id: { image }.image[0].id,
        })
        .returning(["*"]);

      res.status(200).json({
        message: "Добавлено успешно",
        data: [...news, image[0]],
      });
    } else {
      const news = await db("news")
        .insert({
          title,
          description,

          //   img_id: { image }.image[0].id,
          img_id: null,
        })
        .returning(["*"]);

      res.status(200).json({
        data: [...news],
      });
    }
  } catch (error) {
    console.log(error);
    // throw new NotFoundErr("something went wrong");
    res.send(error);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("news").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} не найдено`,
      });
    }

    const del = await db("news").where({ id }).returning(["*"]).del();

    res.status(200).json({
      message: "Удалено успешно",
      deleted: del,
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};

const getMain = async (req, res, next) => {
  res.status(200).json({
    BackEnd_Dasturchi: "Saidqodirxon Rahimov",
  });
};

const getRun = async (req, res, next) => {
  res.status(200).json({
    run: "Ha ishlayabti havotir bolmang",
  });
};

module.exports = {
  getNews,
  postNews,
  showNews,
  patchNews,
  deleteNews,
  getMain,
  getRun,
};
