const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 呟き投稿用API
// 目的: ユーザーからの新しい投稿をサーバーに保存
// 処理: reqのボディから投稿内容(content)を受け取り、DBに保存
router.post("/post", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "投稿内容がありません" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: 1,
      },
      include: {
        author: true,
      },
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

// 最新呟き取得用API
// 目的: 最新の投稿を取得してクライアントに返す
// 処理: DBから最新の投稿を取得し、最新順に並べ替えてクライアントに返す
router.get("/get_latest_post", async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
    });
    return res.json(latestPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラーです" });
  }
});

module.exports = router;
