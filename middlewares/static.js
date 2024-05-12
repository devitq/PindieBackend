// middlewares/static.js

function excludeHTML(req, res, next) {
  const url = req.originalUrl;
  if (url.endsWith(".html")) {
    res.sendStatus(404);
  } else {
    next();
  }
}

module.exports = { excludeHTML };
