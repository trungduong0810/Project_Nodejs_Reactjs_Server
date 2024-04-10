import { DataTypes, Sequelize } from "sequelize";
import data from "../connect_db.js";
data.options.timezone = "+7:00";
const Discount = data.define("discounts", {
  DiscountId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  DiscountPercent: DataTypes.BIGINT,
  TotalOrderPriceLarger: DataTypes.BIGINT,
  DiscountCode: Sequelize.STRING,
});
// data.sync()
export default Discount;
