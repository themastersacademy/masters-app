const User = require("../../../models/user");

const Institution = require("../../../models/institution");
exports.getUser = async (req, res, next) => {
  const user = await User.find();
  if (user) res.json({ status: "succes", message: user });
};
exports.getUserID = async (req, res, next) => {
  try {
    const user = await User.find();
    if (user) {
      const get = [];
      user.map((task) => {
        if ("student" == task.type) get.push(task);
      });
      res.json({ status: "succes", message: get });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.changeRoll = async (req, res, next) => {
  
  const id = req.body.list.id;
  const email = req.body.list.email;
  const name = req.body.list.name;
  const user = await User.findOne({ _id: id });
  if (user) {
    user.name = name;
    user.type = "institution";

    const institution = await Institution({
      name: name,
      id: id,
      avatar:req.body.list.avatar,
    });
   
    institution.save();
    user.avatar = req.body.list.avatar
    user.institutionID = institution._id;
    user.save();

    res.json({ status: "success", message: "Change details successfully" });
  } else res.json({ status: "error", message: "something wrong" });
};

exports.getUserDetails = async (req, res, next) => {
  try {
    const userID = req.session.userID;
    const user = await User.findOne({ _id: userID });
    if (user) {
      console.log(user)
      const userDetails = {
        name: user.name,
        avatar: user.avatar,
        roll:user.type
      };
      
      res.json(userDetails)
    }
  } catch (error) {
    console.log(error);
  }
};
