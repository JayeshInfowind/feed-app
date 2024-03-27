const contentRouter = require("express").Router();
const {uploadContent, getContent} = require("../../controllers/contentController");
const upload = require("../../middleware/multer");

contentRouter.post("/post", upload.single('image'), uploadContent);
contentRouter.get("/list", getContent);

module.exports = contentRouter;