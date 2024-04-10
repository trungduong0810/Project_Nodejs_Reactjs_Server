import express from "express";
import deleteDb from "../../models/deleteDb.js";
import Discount from "../../database/mysql/Discount/discount.js";
import { Op } from "sequelize";
const apiDiscount = express.Router();

//todo: get all discount database
apiDiscount.get("/api/discount", async (req, res) => {
  try {
    const discounts = await Discount.findAll();
    res.status(200).json({ status: "Success", discounts });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

// todo: get discounts by newsIs
// apiDiscount.get("/api/news/:newsId", async (req, res) => {
//   const newsId = req.params.newsId;
//   try {
//     const news = await News.findOne({
//       where: { NewsId: newsId },
//     });
//     if (news) {
//       return res.json({ status: "Success", news });
//     } else {
//       return res.json({ status: "Error", error: `${newsId} not found` });
//     }
//   } catch (error) {
//     res.send("Error occurred while finding news:", error);
//   }
// });

// //todo: add discount database
apiDiscount.post("/api/discount", async (req, res) => {
  const DiscountPercent = req.body.DiscountPercent;
  const TotalOrderPriceLarger = req.body.TotalOrderPriceLarger;
  const DiscountCode = req.body.DiscountCode;
  try {
    const discount = await Discount.findOne({
      where: {
        [Op.or]: [{ DiscountPercent }, { DiscountCode }],
      },
    });
    if (discount) {
      return res.json({
        status: "Error",
        error: "DiscountPercent or DiscountCode already exists",
      });
    }
    const addDiscount = await Discount.create({
      DiscountPercent: DiscountPercent,
      TotalOrderPriceLarger: TotalOrderPriceLarger,
      DiscountCode: DiscountCode,
    });
    if (addDiscount)
      return res.status(200).json({ status: "Success", addDiscount });
  } catch (error) {
    res.status(404).json({ error });
  }
});

// //todo: delete discount database by id
apiDiscount.delete("/api/discount/:id", async (req, res) => {
  const discountId = req.params.id;
  deleteDb(req, res, Discount, discountId);
});

// //todo: update category database by id
apiDiscount.put("/api/discount/:id", async (req, res) => {
  const discountId = req.params.id;
  const { DiscountPercent, TotalOrderPriceLarger, DiscountCode } = req.body;
  try {
    const discount = await Discount.findByPk(discountId);
    if (!discount) {
      return res
        .status(404)
        .json({ status: "Error", error: "discount not found" });
    }
    discount.DiscountPercent = DiscountPercent;
    discount.TotalOrderPriceLarger = TotalOrderPriceLarger;
    discount.DiscountCode = DiscountCode;
    await discount.save();
    res
      .status(200)
      .json({
        status: "Success",
        success: "discount updated successfully",
        discount,
      });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

export default apiDiscount;
