import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import login from "./router/login.js";
import home from "./router/home.js";
import apiUsers from "./router/Api/apiUser.js";
import apiCategory from "./router/Api/apiCategory.js";
import apiProduct from "./router/Api/product/apiProduct.js";
import apiProductSize from "./router/Api/product/apiProductSize.js";
import apiProductColor from "./router/Api/product/apiProductColor.js";
import aipProductDetails from "./router/Api/product/apiProductDetails.js";
import aipCarts from "./router/Api/apiCart.js";
import apiOrders from "./router/Api/apiOrders.js";
import apiNews from "./router/Api/apiNews.js";
import apiReviewProduct from "./router/Api/apiReviewProduct.js";
import apiDiscount from "./router/Api/apiDiscount.js";
import socKetChat from "./router/Api/Chat/socket.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.static("database"));
app.use(express.static("models"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", login);
app.use("/", home);
app.use("/", apiUsers);
app.use("/", apiCategory);
app.use("/", apiProduct);
app.use("/", apiProductSize);
app.use("/", apiProductColor);
app.use("/", aipProductDetails);
app.use("/", aipCarts);
app.use("/", apiOrders);
app.use("/", apiNews);
app.use("/", apiReviewProduct);
app.use("/", apiDiscount);

//todo: ============== server Chat ==================
socKetChat
app.listen(PORT, () => {
  console.log(`server is running on Port`, PORT);
});
