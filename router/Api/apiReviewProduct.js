import express from "express";
import deleteDb from "../../models/deleteDb.js";
import Reviews from "../../database/mysql/review/reviewProducts.js";
const apiReviewProduct = express.Router();

//todo: get all category database
apiReviewProduct.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Reviews.findAll();
    res.json({ status: "Success", data: reviews });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

// todo: get reviews by productName
apiReviewProduct.get("/api/reviews/:productName", async (req, res) => {
  const productName = req.params.productName;
  try {
    const reviews = await Reviews.findAll({
      where: { ProductName: productName },
    });
    if (reviews) {
      return res.status(200).json({ status: "Success", reviews });
    } else {
      return res.json({ status: "Error", error: `${productName} not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

// //todo: add category database
apiReviewProduct.post("/api/reviews", async (req, res) => {
  const UserId = req.body.UserId;
  const ProductName = req.body.ProductName;
  const Star = req.body.Star;
  const FeedBack = req.body.FeedBack;
  const ReviewImages = req.body.ReviewImages;
  const ReviewContent = req.body.ReviewContent;

  try {
    const addReviews = await Reviews.create({
      UserId: UserId,
      ProductName: ProductName,
      Star: Star,
      FeedBack: FeedBack,
      ReviewImages: ReviewImages,
      ReviewContent: ReviewContent,
    });
    if (addReviews)
      return res.json({
        status: "Success",
        success: "Create Category successfully",
      });
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

// //todo: delete category database by id
apiReviewProduct.delete("/api/reviews/:id", async (req, res) => {
  const reviewId = req.params.id;
  deleteDb(req, res, Reviews, reviewId);
});

export default apiReviewProduct;
