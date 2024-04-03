import { DataTypes, Sequelize } from "sequelize";
import data from "../connect_db.js";
data.options.timezone = "+7:00";
const Products = data.define("products", {
  ProductId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  ProductName: Sequelize.STRING,
  ProductDesc: DataTypes.TEXT,
  ProductCategory: Sequelize.STRING,
  ProductSlug: Sequelize.STRING,
  ProductPrice: DataTypes.BIGINT,
  ProductDiscount: DataTypes.BIGINT,
  ProductPriceNew: DataTypes.BIGINT,
  ProductQuantity: DataTypes.BIGINT,
  ProductImage: Sequelize.STRING,
});
// data.sync()
export default Products;
