const Institution = require("../../../models/institution");
const User = require("../../../models/user");
exports.getInstitution = async (req, res, next) => {
  const institute = await Institution.findOne({ _id: req.body.id });
  if (institute) res.json({ status: "success", message: institute });
  else res.json({ status: "error", message: "something wrong" });
};

exports.getInstituteName = async (req, res, next) => {
  try {
    const data = [];
    const institute = await Institution.find();
    if (institute) {
      institute.map((task) => data.push({ label: task.name, id: task._id }));

      res.json({ status: "ok", message: data });
    }
  } catch (error) {}
};

exports.getTeacher = async (req, res, next) => {
  try {
    const user = await User.find();
    if (user) {
      const send = [];
      console.log(user);
      user.map((task) => {
   if('student' == task.type)
        send.push({ label: task.email, id: task._id })
      });
      res.json({ status: "ok", message: send });
    }
  } catch (error) {}
};

exports.createTeacher = async (req, res, next) => {
  const { id, teacherName } = req.body;
  try {
    const institute = await Institution.findOne({ _id: id });
    if (institute) {
      const user = await User.findOne({ _id: teacherName.id });
      if (user) {
        const check = [];
        institute.teacherList.map((task) => {
          if (user._id.valueOf() == task.id.valueOf()) check.push(task);
        });
        if (check.length == 0) {
          institute.teacherList.push({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            id: user._id,
          });
          institute.save();
          user.institutionID = institute._id;
          user.type = "teacher";
          user.save();
          res.json({ status: "success", message: "Add teacher successfully" });
        } else
          res.json({
            status: "already",
            message: "The teacher name is already exists",
          });
      } else res.json({ status: "error", message: "something wrong" });
    } else res.json({ status: "error", message: "something wrong" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "something wrong" });
  }
};

exports.addTeacherBatch = async (req, res, next) => {
  const { id, teacherName, teacherID } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ _id: teacherID });

    const institute = await Institution.findOne({ _id: id });
    if (institute) {
      const check = [];

      institute.teacherList.map((task) => {
        const get = task.batchList.filter(
          (task) => task.batchID == teacherName.batchID
        );

        if (get.length == 0) {
          if (user.name == task.name) {
            check.push(task);
            task.batchList.push({
              batchName: teacherName.label,
              batchID: teacherName.batchID,
            });
          }
        }
      });
      if (check.length !== 0) {
        user.batchID.push(teacherName.batchID);
        institute.save();
        user.save();
        res.json({ status: "success", message: "Add batch successfully" });
      } else if (check.length == 0)
        res.json({ status: "already", message: "batch already exists" });
    }
  } catch (error) {}
};

exports.editTeacherAction = async (req, res, next) => {
  const { type, data, id } = req.body;
  const { teacher, removeBatch } = data;
  console.log(removeBatch);
  try {
    const user = await User.findOne({ _id: teacher.id });

    const institute = await Institution.findOne({ _id: id });
    if (institute) {
      institute.teacherList.map((task) => {
        const get = task.batchList.filter(
          (task) => task.batchID.valueOf() !== removeBatch.batchID.valueOf()
        );

        task.batchList = get;
      });
      console.log(institute.teacherList);
      console.log("next");
      institute.save();
      const get = user.batchID.filter(
        (task) => task.valueOf() !== removeBatch.batchID.valueOf()
      );
      console.log(get);

      user.batchID = get;
      user.save();
      console.log(user);
      res.json({ status: "success", message: "Remove batch successfully" });
    } else res.json({ status: "error", message: "Something wrong" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Something wrong" });
  }
};

exports.removeTeacher = async (req, res, next) => {
  const { id, data } = req.body;
  try {
    const user = await User.findOne({ _id: data.id });

    const institute = await Institution.findOne({ _id:id });
    if (institute) {
      const collectBatch = [];
      institute.teacherList.map((task) =>
        task.batchList.map((task) => collectBatch.push(task.batchID.valueOf()))
      );
      const get = institute.teacherList.filter(
        (task) => task.id.valueOf() !== data.id.valueOf()
      );
      institute.teacherList = get;
      institute.save();
      const getUserID = user.batchID.filter(
        (task) => collectBatch.indexOf(task.valueOf()) == -1
      );
      user.batchID=getUserID
      user.type = 'student'
      
      user.save();
      console.log(user)
      res.json({status:'success',message:'Remove teacher successfully'})
    }
    else res.json({status:'error',message:'Something wrong'})
  } catch (error) {
   res.json({status:'error',message:'Something wrong'})
  }
};
