const Institution = require("../../../models/institution");
exports.getInstitution = async (req, res, next) => {
  const institute = await Institution.findOne({ _id: req.body.id });
  if (institute) res.json({ status: "success", message: institute });
  else res.json({ status: "error", message: "something wrong" });
};

