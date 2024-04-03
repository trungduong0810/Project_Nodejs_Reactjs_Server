import express from "express";
import deleteDb from "../../models/deleteDb.js";
import authToken from "../../../Server/models/authToken.js";
import Carts from "../../database/mysql/Cart/Cart.js";
const aipCarts = express.Router();

// todo: get carts by userId
aipCarts.get("/api/carts/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const carts = await Carts.findAll({
      where: { userId: userId },
    });
    if (carts) {
      return res.json({ status: "Success", data: carts });
    } else {
      return res.json({ status: "Error", error: `${userId} not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

// //todo: add category database
aipCarts.post("/api/carts", async (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const productName = req.body.productName;
  const productImage = req.body.productImage;
  const productPrice = req.body.productPrice;
  const size = req.body.size;
  const color = req.body.color;
  const quantity = req.body.quantity;

  try {
    const addCart = await Carts.create({
      UserId: userId,
      ProductId: productId,
      ProductName: productName,
      ProductImage: productImage,
      ProductPrice: productPrice,
      Size: size,
      Color: color,
      Quantity: quantity,
    });
    if (addCart)
      return res.json({
        status: "Success",
        success: "Add cart successfully",
        data: addCart,
      });
  } catch (error) {
    res.send("Error occurred while finding carts:", error);
  }
});

// //todo: delete productId by UserId

aipCarts.delete("/api/carts/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.productId;
  const cartId = req.body.cartId;
  try {
    const userIdExist = await Carts.findAll({
      where: { UserId: userId },
    });
    if (userIdExist) {
      const deleteCart = await Carts.destroy({
        where: {
          CartId: cartId,
          UserId: userId,
          ProductId: productId,
        },
      });
      if (deleteCart) {
        return res.json({
          status: "Success",
          success: "Delete data successfully",
        });
      } else {
        return res.json({ status: "Error", error: "Data not exist" });
      }
    }
  } catch (error) {
    res.send("Error occurred while deleting user:", error);
  }
});

export default aipCarts;
