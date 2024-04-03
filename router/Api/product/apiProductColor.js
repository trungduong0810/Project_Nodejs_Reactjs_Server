import express from "express";
import ProductColors from "../../../../Server/database/mysql/Product/ProductColor.js";
const apiProductColor = express.Router();
//todo: get all product color
apiProductColor.get("/api/product/color", async (req, res) => {
  try {
    const productColors = await ProductColors.findAll();
    res.json({ status: "Success", data: productColors });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

//todo: get product color by productId
apiProductColor.get("/api/product/color/:productId", async (req, res) => {
  const productId = req.params.productId;;
  try {
    const colors = await ProductColors.findOne({
      where: { ProductId: productId },
    });
    if (colors) {
      return res.json({ status: "Success", data: colors });
    } else {
      return res.json({ status: "Error", error: `${productId} not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

// //todo: add product vào database
apiProductColor.post("/api/product/color", async (req, res) => {
  const ProductId = req.body.productId;
  const Black = req.body.colorBlack;
  const Blue = req.body.colorBlue;
  const YellowEarth = req.body.colorEarthYellow;
  const Gray = req.body.colorGray;
  const Green = req.body.colorGreen;
  const Orange = req.body.colorOrange;
  const Pink = req.body.colorPink;
  const Purple = req.body.colorPurple;
  const Red = req.body.colorRed;
  const White = req.body.colorWhite;

  try {
    const productColor = await ProductColors.findOne({
      where: { ProductId: ProductId },
    });
    if (productColor) {
      return res.json({
        status: "Error",
        error: "Product id already exists",
      });
    }

    const addProductColor = await ProductColors.create({
      ProductId: ProductId,
      Black: Black,
      Blue: Blue,
      YellowEarth: YellowEarth,
      Gray: Gray,
      Green: Green,
      Orange: Orange,
      Pink: Pink,
      Purple: Purple,
      Red: Red,
      White: White,
    });
    if (addProductColor)
      return res.json({
        status: "Success",
        success: "Add color product successfully",
      });
  } catch (error) {
    res.send("Error occurred while finding user:", error);
  }
});

// //todo: delete product database by id
apiProductColor.delete("/api/product/color:id", async (req, res) => {
  const productColorId = req.params.id;
  deleteDb(req, res, ProductColors, productColorId);
});

export default apiProductColor;
