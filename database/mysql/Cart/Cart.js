import { DataTypes, Sequelize } from "sequelize";
import data from "../connect_db.js";
data.options.timezone = "+7:00";
const Carts = data.define("carts", {
  CartId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  UserId: DataTypes.BIGINT,
  ProductId: DataTypes.BIGINT,
  ProductName: Sequelize.STRING,
  ProductImage: Sequelize.STRING,
  ProductPrice: DataTypes.BIGINT,
  Size: Sequelize.STRING,
  Color: Sequelize.STRING,
  Quantity: DataTypes.BIGINT,
});
// data.sync()
export default Carts;
