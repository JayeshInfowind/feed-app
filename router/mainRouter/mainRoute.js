const router = require("express").Router();
const contentRouter = require("../contentRoutes/contentRoute");

router.use("/content", contentRouter);

module.exports = router;