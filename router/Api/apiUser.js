import express from "express";
import bcrypt from "bcrypt";
import authToken from "../../../Server/models/authToken.js";
import Users from "../../database/mysql/users/users.js";
import deleteDb from "../../models/deleteDb.js";
const apiUsers = express.Router();

//todo: Lấy ra tất cả các user đã đăng kí vào database
apiUsers.get("/api/users", authToken, async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json({ status: "Success", data: users });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

//todo: Lấy ra user theo id

apiUsers.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByPk(userId);
    if (user) {
      res.json({ status: "Success", user });
    } else {
      res.status(404).json({ status: "Error", message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

//todo: Thêm user vào database
apiUsers.post("/api/users", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await Users.findOne({
      where: { email: email },
    });
    if (user) {
      return res.json({ status: "Error", error: "Account already exists" });
    }
    // const hashPassword = await bcrypt.hash(password, 10);
    const addUser = await Users.create({
      username: username,
      email: email,
      password: password,
    });
    if (addUser)
      return res.json({
        status: "Success",
        success: "Create account successfully",
      });
  } catch (error) {
    res.send("Error occurred while finding user:", error);
  }
});

//todo: delete user database by id
apiUsers.delete("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  deleteDb(req, res, Users, userId);
});

//todo: update imageUser
apiUsers.put("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { userImage } = req.body;
  try {
    const updateUser = await Users.update(
      { userImage: userImage },
      { where: { id: userId } }
    );
    if (updateUser)
      return res.status(200).json({
        status: "Success",
        success: "User information updated successfully",
      });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

export default apiUsers;
