import express from "express";
import Orders from "../../database/mysql/Order/Order.js";
import deleteDb from "../../models/deleteDb.js";
const apiOrders = express.Router();

// todo: get orders by userId
apiOrders.get("/api/orders/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const order = await Orders.findAll({
      where: { userId: userId },
    });
    if (order) {
      return res.status(200).json({ status: "Success", data: order });
    } else {
      return res
        .status(404)
        .json({ status: "Error", error: `${userId} not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

// todo: get  all orders
apiOrders.get("/api/orders", async (req, res) => {
  try {
    const order = await Orders.findAll();
    if (order) {
      return res.status(200).json({ status: "Success", data: order });
    } else {
      return res.status(404).json({ status: "Error", error: `data not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

// //todo: add orders database
apiOrders.post("/api/orders", async (req, res) => {
  const userId = req.body.userId;
  const productImage = req.body.productImage;
  const productName = req.body.productName;
  const productSize = req.body.productSize;
  const productColor = req.body.productColor;
  const productQuantity = req.body.productQuantity;
  const orderPrice = req.body.orderPrice;
  const email = req.body.email;
  const name = req.body.name;
  const numberPhone = req.body.numberPhone;
  const address = req.body.address;
  const payment = req.body.payment;
  const status = req.body.status;

  try {
    const addOrders = await Orders.create({
      UserId: userId,
      ProductImage: productImage,
      ProductName: productName,
      ProductSize: productSize,
      ProductColor: productColor,
      ProductQuantity: productQuantity,
      OrderPrice: orderPrice,
      Email: email,
      Name: name,
      Phone: numberPhone,
      Address: address,
      Payment: payment,
      Status: status,
    });
    if (addOrders)
      return res.status(200).json({
        status: "Success",
        success: "Add cart successfully",
        addOrders,
      });
  } catch (error) {
    res.send("Error occurred while finding orders:", error);
  }
});

// todo: delete order by orderId
apiOrders.delete("/api/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  deleteDb(req, res, Orders, orderId);
});

//todo: Update status order
apiOrders.put("/api/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;
  console.log(orderId, newStatus);

  try {
    const order = await Orders.findByPk(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ status: "Error", error: `Order ${orderId} not found` });
    }
    order.Status = newStatus;
    await order.save();
    return res
      .status(200)
      .json({
        status: "Success",
        message: `Order ${orderId} status updated successfully`,
      });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: "Error occurred while updating order status",
      details: error,
    });
  }
});
export default apiOrders;
