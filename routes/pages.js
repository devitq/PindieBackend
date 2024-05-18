// routes/pages.js

const pagesRouter = require("express").Router();

const { sendLogin, sendDashboard } = require("../controllers/pages.js");
const { AuthorizePages } = require("../middlewares/pages.js");

pagesRouter.get("/admin/login", AuthorizePages, sendLogin);
pagesRouter.get("/admin", AuthorizePages, sendDashboard);

module.exports = pagesRouter;
