const getAllDb = async (req, res, doc) => {
  try {
    const data = await doc.findAll();
    res.json({ status: "Success", data: data });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

export default getAllDb;
