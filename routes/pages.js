// routes/pages.js

const pagesRouter = require("express").Router();

const { sendIndex, sendDashboard } = require("../controllers/pages.js");
const { AuthorizePages } = require("../middlewares/pages.js");

pagesRouter.get("/", AuthorizePages, sendIndex);
pagesRouter.get("/admin", AuthorizePages, sendDashboard);

module.exports = pagesRouter;
