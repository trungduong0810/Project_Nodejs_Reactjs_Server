import { DataTypes, Sequelize } from "sequelize";
import data from "../connect_db.js";
data.options.timezone = "+7:00";
const ProductSizes = data.define("productSizes", {
  sizeId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  ProductId: DataTypes.BIGINT,
  size_S: Sequelize.STRING,
  size_M: Sequelize.STRING,
  size_L: Sequelize.STRING,
  size_XL: Sequelize.STRING,
  size_2XL: Sequelize.STRING,
  size_3Xl: Sequelize.STRING,
  size_4Xl: Sequelize.STRING,
});
// data.sync()
export default ProductSizes;
