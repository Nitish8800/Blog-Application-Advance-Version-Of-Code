const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const likeRouter = require("./routes/like");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const commentsRouter = require("./routes/comment");
const categoriesRouter = require("./routes/categories");
const { errors: celebrateErrors } = require("celebrate");

/**
 * All express middleware goes here
 * `express.json()` = parsing request body
 * `bearerToken` = For `Basic Auth` token
 */
const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config({
  path: path.join(__dirname, ".env"),
});

/**
 * Handaling database connection
 * In this application we are using only MongoDB with helper lib `mongoose`
 */
connectDB();

/**
 * Handaling Post uploading by multer
 * In this application we are using uploading Post with helper lib `multer`
 * It save the Post in the upload directory
 */
const dir = "./upload/post";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
app.use("/upload", express.static(path.join(__dirname, "./upload/post")));

/**
 * Initializing APIs base routes.
 * APIs base path also depends on server proxy configuration.
 */
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/feelings", likeRouter);
app.use("/comments", commentsRouter);
app.use("/categories", categoriesRouter);

app.get("/", (req, res) => {
  res.send("Hello Blog App Ready ....................... ");
});

/**
 * Handaling All Validations Error with helper lib `celebrate` and "joi"
 */
app.use(celebrateErrors());

/**
 * Connect the PORT
 * Server started at port
 */
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at port: http://localhost:${PORT}`);
});
