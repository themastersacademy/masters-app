const ExcelJS = require("exceljs");
const Batch = require("../../../models/batch.js");
exports.downloadList = async (req, res) => {
  try {
    const { batchid, examid } = req.headers;
    const batch = await Batch.findOne({ _id: batchid });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");
   
    const list = batch.scheduleTest.filter(
      (task) => task.examID.valueOf() == examid.valueOf()
    );

    worksheet.columns = [
      { header: "Name", key: "name", width: 50 },
      { header: "Roll Number", key: "roll", width: 20 },
      { header: "Department", key: "dept", width: 10 },
      { header: "Email", key: "email", width: 50 },
      { header: "Mark", key: "mark", width: 10 },
    ];

    list[0].studentPerformance.map((task, index) => {
      worksheet.addRow({ 
        name: task.name,
        roll: task.rollNumber,
        dept: task.dept,
        email: task.email,
        mark: task.mark,
      });
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename=example.xlsx');
    res.setHeader("filename",`${list[0].name}.xlsx`);
    workbook.xlsx.write(res).then(function () {
      res.end();
    });
  } catch (error) {
    throw error;
  }
};
// app.get('/download', function (req, res) {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Sheet 1');
//     console.log(req.headers.examid)
//     worksheet.columns = [
//       { header: 'Id', key: 'id', width: 10 },
//       { header: 'Name', key: 'name', width: 32 },
//       { header: 'D.O.B.', key: 'dob', width: 10 }
//     ];
//     for(let i=0;i<5;i++)
//   {
//     worksheet.addRow({ id: 1, name: 'John Doe', dob: 'sss' });

//   }

//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename="example.xlsx"');
//     res.setHeader('filename',"example.xlsx");
//     workbook.xlsx.write(res)
//       .then(function () {
//         res.end();
//       });
//   });
