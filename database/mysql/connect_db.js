import Sequelize from "sequelize";
const data = new Sequelize("projectNodejs", "root", "Duong@0810", {
  host: "localhost",
  dialect: "mysql",
});
data
  .authenticate()
  .then(() => {
    console.log("Kết nối thành công đến cơ sở dữ liệu.");
  })
  .catch((err) => {
    console.error("Không thể kết nối đến cơ sở dữ liệu:", err);
  });

export default data;
