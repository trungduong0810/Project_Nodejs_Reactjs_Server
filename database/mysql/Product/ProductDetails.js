import { DataTypes, Sequelize } from "sequelize";
import data from "../connect_db.js";
data.options.timezone = "+7:00";
const ProductDetails = data.define("productDetails", {
  ProductId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  ProductImages: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
  ContentProduct: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
// data.sync()
export default ProductDetails;
