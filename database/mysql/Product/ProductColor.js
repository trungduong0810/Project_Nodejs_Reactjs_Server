import { DataTypes, Sequelize } from "sequelize";
import data from "../connect_db.js";
data.options.timezone = "+7:00";
const ProductColors = data.define("productColors", {
  colorId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  ProductId: DataTypes.BIGINT,
  Black: Sequelize.STRING,
  Blue: Sequelize.STRING,
  YellowEarth: Sequelize.STRING,
  Gray: Sequelize.STRING,
  Green: Sequelize.STRING,
  Orange: Sequelize.STRING,
  Pink: Sequelize.STRING,
  Purple: Sequelize.STRING,
  Red: Sequelize.STRING,
  White: Sequelize.STRING,
});
// data.sync()
export default ProductColors;
