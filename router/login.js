import express from "express";
import jwt from "jsonwebtoken";
import Users from "../../Server/database/mysql/users/users.js";
const login = express.Router();

login.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({
      where: { email: email },
    });
    const accessToken = jwt.sign(user.email, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(user.email, process.env.REFRESH_TOKEN_SECRET);
    if (user) {
      if (password === user.password) {
        return res.json({ status: "Success", user, accessToken, refreshToken });
      } else {
        return res.json({
          status: "Error",
          error: "Invalid email or password",
        });
      }
    } else {
      return res.json({ status: "Error", error: "Account not exists" });
    }
  } catch (error) {
    return res.json({ status: "Error", error: "Account not exists" });
  }
});

export default login;
