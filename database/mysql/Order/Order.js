import { DataTypes, Sequelize } from "sequelize";
import data from "../connect_db.js";
data.options.timezone = "+7:00";
const Orders = data.define("orders", {
  OrderId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  UserId: DataTypes.BIGINT,
  ProductImage: Sequelize.STRING,
  ProductName: Sequelize.STRING,
  ProductSize: Sequelize.STRING,
  ProductColor: Sequelize.STRING,
  ProductQuantity: DataTypes.BIGINT,
  OrderPrice: DataTypes.BIGINT,
  Email: Sequelize.STRING,
  Name: Sequelize.STRING,
  Phone: Sequelize.STRING,
  Address: DataTypes.TEXT,
  Payment: Sequelize.STRING,
  Status: DataTypes.BIGINT,
});
// data.sync()
export default Orders;
