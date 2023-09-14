const express = require("express");
const app = express();
// 特定のURLパスに対するルーティング処理を行うルーターモジュール
const authRoute = require("./routers/auth");
const postsRoute = require("./routers/post");
// const usersRoute = require("./routers/user")
const cors = require("cors");

require("dotenv").config();

const PORT = 8000;

app.use(cors());
app.use(express.json());
// 1: : ミドルウェアを適用するパスを指定
// "/api/auth"の場合、/api/auth で始まるすべてのURLに対するリクエストがこのmiddleWareに送信される
// 2: 実際のミドルウェア関数を指定。res,req,next等で、request, respose, middlewareに関する情報操作が可能
// 以下は、"/api/auth" パスに対するリクエストが到達した場合、authRoute ミドルウェアが実行される処理
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
// app.use("/api/users", usersRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
