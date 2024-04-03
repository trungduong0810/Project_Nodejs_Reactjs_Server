import express from "express";
import Products from "../../../../Server/database/mysql/Product/Product.js";
import deleteDb from "../../../models/deleteDb.js";
const apiProduct = express.Router();
//todo: get all product
apiProduct.get("/api/products", async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json({ status: "Success", data: products });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

//todo: get product by slug
apiProduct.get("/api/products/:slug", async (req, res) => {
  const slug = req.params.slug;
  try {
    const product = await Products.findOne({
      where: { ProductSlug: slug },
    });
    if (product) {
      return res.json({ status: "Success", data: product });
    } else {
      return res.json({ status: "Error", error: `${slug} not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

//todo: get product by id
apiProduct.get("/api/products/byId/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Products.findAll({
      where: { ProductId: productId },
    });
    if (product) {
      return res.json({ status: "Success", data: product });
    } else {
      return res.json({ status: "Error", error: `${productId} not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

//todo: add product vào database
apiProduct.post("/api/products", async (req, res) => {
  const productName = req.body.productName;
  const productDesc = req.body.productDesc;
  const productSlug = req.body.productSlug;
  const productCategory = req.body.productCategory;
  const productPrice = req.body.productPrice;
  const productDiscount = req.body.productDiscount;
  const productPriceNew = req.body.productPriceNew;
  const productQuantity = req.body.productQuantity;
  const productImage = req.body.productImage;

  try {
    const product = await Products.findOne({
      where: { productName: productName },
    });
    if (product) {
      return res.json({
        status: "Error",
        error: "Product name already exists",
      });
    }

    const addProduct = await Products.create({
      ProductName: productName,
      ProductDesc: productDesc,
      ProductSlug: productSlug,
      ProductCategory: productCategory,
      ProductPrice: productPrice,
      ProductDiscount: productDiscount,
      ProductPriceNew: productPriceNew,
      ProductQuantity: productQuantity,
      ProductImage: productImage,
    });
    if (addProduct)
      return res.json({
        status: "Success",
        success: "Add product successfully",
        data: addProduct,
      });
  } catch (error) {
    res.send("Error occurred while finding user:", error);
  }
});

//todo: delete product database by id
apiProduct.delete("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  deleteDb(req, res, Products, productId);
});

export default apiProduct;
