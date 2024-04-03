import express from "express";
import ProductSizes from "../../../../Server/database/mysql/Product/ProductSize.js";
const apiProductSize = express.Router();
//todo: get all product size
apiProductSize.get("/api/product/size", async (req, res) => {
  try {
    const productSizes = await ProductSizes.findAll();
    res.json({ status: "Success", data: productSizes });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});
//todo: get product size by productId
apiProductSize.get("/api/product/size/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const size = await ProductSizes.findOne({
      where: { ProductId: productId },
    });
    if (size) {
      return res.json({ status: "Success", data: size });
    } else {
      return res.json({ status: "Error", error: `${productId} not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

//todo: add  product vào database
apiProductSize.post("/api/product/size", async (req, res) => {
  const ProductId = req.body.productId;
  const size_S = req.body.sizeS;
  const size_M = req.body.sizeM;
  const size_L = req.body.sizeL;
  const size_XL = req.body.sizeXL;
  const size_2XL = req.body.size2XL;
  const size_3Xl = req.body.size3XL;
  const size_4Xl = req.body.size4XL;

  try {
    const productSize = await ProductSizes.findOne({
      where: { ProductId: ProductId },
    });
    if (productSize) {
      return res.json({
        status: "Error",
        error: "Product id already exists",
      });
    }

    const addProductSize = await ProductSizes.create({
      ProductId: ProductId,
      size_S: size_S,
      size_M: size_M,
      size_L: size_L,
      size_XL: size_XL,
      size_2XL: size_2XL,
      size_3Xl: size_3Xl,
      size_4Xl: size_4Xl,
    });
    if (addProductSize)
      return res.json({
        status: "Success",
        success: "Add product successfully",
      });
  } catch (error) {
    res.send("Error occurred while finding user:", error);
  }
});

//todo: delete product database by id
apiProductSize.delete("/api/product/size:id", async (req, res) => {
  const productSizeId = req.params.id;
  deleteDb(req, res, ProductSizes, productSizeId);
});

export default apiProductSize;
