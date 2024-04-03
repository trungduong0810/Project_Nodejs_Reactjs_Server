import express from "express";
import Category from "../../database/mysql/Category/category.js";
import deleteDb from "../../models/deleteDb.js";
import authToken from "../../../Server/models/authToken.js";
const apiCategory = express.Router();

//todo: get all category database
apiCategory.get("/api/category", async (req, res) => {
  try {
    const category = await Category.findAll();
    res.json({ status: "Success", data: category });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});
// todo: getCategory by CategoryName
apiCategory.get("/api/category/:name", async (req, res) => {
  const categoryName = req.params.name;
  try {
    const category = await Category.findOne({
      where: { CategoryName: categoryName },
    });
    if (category) {
      return res.json({ status: "Success", data: category });
    } else {
      return res.json({ status: "Error", error: `${categoryName} not found` });
    }
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

//todo: add category database
apiCategory.post("/api/category", async (req, res) => {
  const categoryName = req.body.categoryName;
  try {
    const category = await Category.findOne({
      where: { CategoryName: categoryName },
    });
    if (category) {
      return res.json({ status: "Error", error: "Category already exists" });
    }
    const addCategory = await Category.create({
      CategoryName: categoryName,
    });
    if (addCategory)
      return res.json({
        status: "Success",
        success: "Create Category successfully",
      });
  } catch (error) {
    res.send("Error occurred while finding Category:", error);
  }
});

//todo: delete category database by id
apiCategory.delete("/api/category/:id", async (req, res) => {
  const categoryId = req.params.id;
  deleteDb(req, res, Category, categoryId);
});

//todo: update category database by id
apiCategory.put("/api/category/:id", async (req, res) => {
  const categoryId = req.params.id;
  const { categoryName } = req.body;
  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ status: "Error", error: "Category not found" });
    }
    category.CategoryName = categoryName;
    await category.save();

    res.json({ status: "Success", success: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

export default apiCategory;
