const deleteDb = async (req, res, doc, field) => {
  try {
    const data = await doc.findByPk(field);
    if (!data) return res.json({ status: "Error", error: "Data not exist" });
    await data.destroy();
    return res.json({ status: "Success", success: "Delete data successfully" });
  } catch (error) {
    res.send("Error occurred while deleting user:", error);
  }
};
export default deleteDb;
