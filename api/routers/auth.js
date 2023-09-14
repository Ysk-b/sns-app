const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 新規ユーザー登録用API
// 1. HTTP POSTリクエストに対する /register エンドポイントを定義(ユーザー情報の送信先)
router.post("/register", async (req, res) => {
  // 2. HTTPリクエストのボディ(req)から、username、email、passwordの情報を取得
  // ※ usename等の変数は、クライアントサイドで指定された値に準拠する 
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. prismaの'user'テーブルに、新しいレコード(行)を作成
  // ※ username, email, passwordフィールド値を持つレコードをDBに挿入し、変数userに格納
  // 4. 生成された新規レコードはDBに 挿入され、その結果を返す
  // ※ 非同期で処理され、Promiseを返す。
  // 5. dataオブジェクト(prismaで新規DBレコード生成時に使用される)を使用し、
  //    DBのテーブルに対応するプロパティと値で更新する
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  // 作成されたuserオブジェクトをjson形式で返す
  // = 指定されたデータをresがレスポンスのbodyに設定し、クライアントに送信する
  return res.json({ user });
});

// ユーザーログイン用 API
// HTTP POSTリクエストが/login endpointに送信される
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // prismaの'user'テーブルから、指定された条件に合致するテーブルを検索
  // e.g. whereオプションを使用し、'email'が指定された値と合致するユーザーを検索
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // userが存在しない場合、ステータスコード401（Unauthorized）とError MessageをJSON形式で返す
  // status(): HTTPレスポンスのステータスコードを設定するメソッド
  if (!user) {
    return res.status(401).json({
      error: "ユーザーが存在しません",
    });
  }

  // bcrypt特有のcompare関数で、平文とハッシュ化されたpasswordを比較
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // 異なる場合、401とError MessageをJSON形式で返す
  if (!isPasswordValid) {
    return res.status(401).json({ error: "パスワードが間違っています" });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.json({ token });
});

module.exports = router;
