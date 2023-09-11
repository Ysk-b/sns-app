const express = require("express");
const app = express();
const authRoute = require("./routers/auth");
const postsRoute = require("./routers/posts");

require("dotenv").config();
const cors = require("cors");

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
