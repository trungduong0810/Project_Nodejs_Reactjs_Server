import { DataTypes, Sequelize } from "sequelize";
import data from "../connect_db.js";
data.options.timezone = "+7:00";
const News = data.define("news", {
  NewsId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  NewsImage: Sequelize.STRING,
  NewsTitle: Sequelize.STRING,
  NewsContent: DataTypes.TEXT,
});
// data.sync()
export default News;
