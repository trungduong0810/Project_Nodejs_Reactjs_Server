import express from "express";
import authToken from "../models/authToken.js";
import Users from "../database/mysql/users/users.js";

const home = express.Router();

home.get("/home", authToken, async (req, res) => {
  const userEmail = req.user;
  try {
    const user = await Users.findOne({
      where: { email: userEmail },
    });
    if (user) {
      return res.json({ status: "Success", user });
    } else {
      return res.json({ status: "Error", error: "User not found" });
    }
  } catch (error) {
    return res.json({ status: "Error", error: "Server error" });
  }
});

export default home;
