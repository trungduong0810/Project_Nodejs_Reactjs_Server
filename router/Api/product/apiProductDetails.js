import express from "express";
import ProductDetails from "../../../../Server/database/mysql/Product/ProductDetails.js";
const aipProductDetails = express.Router();
//todo: get all product color
aipProductDetails.get("/api/product/details", async (req, res) => {
  try {
    const productDetails = await ProductDetails.findAll();
    res.json({ status: "Success", data: productDetails });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

//todo: get product color by productId
aipProductDetails.get("/api/product/details/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const productDetails = await ProductDetails.findOne({
      where: { ProductId: productId },
    });
    if (productDetails) {
      return res.json({ status: "Success", data: productDetails });
    } else {
      return res.json({ status: "Error", error: `${productId} not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

// //todo: add product vào database
aipProductDetails.post("/api/product/details", async (req, res) => {
  const ProductId = req.body.productId;
  const productImages = req.body.productImages;
  const contentProduct = req.body.contentProduct;

  try {
    const productDetails = await ProductDetails.findOne({
      where: { ProductId: ProductId },
    });
    if (productDetails) {
      return res.json({
        status: "Error",
        error: "Product id already exists",
      });
    }

    const addProductDetails = await ProductDetails.create({
      ProductId: ProductId,
      ProductImages: productImages,
      ContentProduct: contentProduct,
    });
    if (addProductDetails)
      return res.json({
        status: "Success",
        success: "Add product details product successfully",
      });
  } catch (error) {
    res.send("Error occurred while finding user:", error);
  }
});

// // //todo: delete product database by id
// aipProductDetails.delete("/api/product/color:id", async (req, res) => {
//   const productColorId = req.params.id;
//   deleteDb(req, res, ProductColors, productColorId);
// });

export default aipProductDetails;
