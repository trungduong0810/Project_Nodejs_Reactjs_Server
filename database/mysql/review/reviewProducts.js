import { DataTypes, Sequelize } from "sequelize";
import data from "../connect_db.js";
data.options.timezone = "+7:00";
const Reviews = data.define("Reviews", {
  ReviewId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  UserId: DataTypes.BIGINT,
  ProductName: Sequelize.STRING,
  Star: DataTypes.FLOAT,
  FeedBack: Sequelize.STRING,
  ReviewImages: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
  ReviewContent: DataTypes.TEXT,
});
// data.sync()
export default Reviews;
