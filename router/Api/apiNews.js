import express from "express";
import News from "../../database/mysql/News/News.js";
import deleteDb from "../../models/deleteDb.js";
const apiNews = express.Router();

//todo: get all news database
apiNews.get("/api/news", async (req, res) => {
  try {
    const news = await News.findAll();
    res.status(200).json({ status: "Success", news });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

// todo: get news by newsIs
apiNews.get("/api/news/:newsId", async (req, res) => {
  const newsId = req.params.newsId;
  try {
    const news = await News.findOne({
      where: { NewsId: newsId },
    });
    if (news) {
      return res.json({ status: "Success", news });
    } else {
      return res.json({ status: "Error", error: `${newsId} not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding news:", error);
  }
});

// //todo: add category database
apiNews.post("/api/news", async (req, res) => {
  const NewsTitle = req.body.NewsTitle;
  const NewsImage = req.body.NewsImage;
  const NewsContent = req.body.NewsContent;
  try {
    const news = await News.findOne({
      where: { NewsTitle: NewsTitle },
    });
    if (news) {
      return res.json({ status: "Error", error: "NewsTitle already exists" });
    }
    const addNews = await News.create({
      NewsTitle: NewsTitle,
      NewsImage: NewsImage,
      NewsContent: NewsContent,
    });
    if (addNews) return res.status(200).json({ status: "Success", addNews });
  } catch (error) {
    res.status(404).json({ error });
  }
});

// //todo: delete category database by id
apiNews.delete("/api/news/:id", async (req, res) => {
  const newsId = req.params.id;
  deleteDb(req, res, News, newsId);
});

// //todo: update category database by id
apiNews.put("/api/news/:id", async (req, res) => {
  const newsId = req.params.id;
  const { NewsTitle, NewsImage, NewsContent } = req.body;
  try {
    const news = await News.findByPk(newsId);
    if (!news) {
      return res.status(404).json({ status: "Error", error: "news not found" });
    }
    news.NewsTitle = NewsTitle;
    news.NewsImage = NewsImage;
    news.NewsContent = NewsContent;
    await news.save();
    res.status(200).json({ success: "news updated successfully", news });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

export default apiNews;
