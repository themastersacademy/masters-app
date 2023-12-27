const questionCollection = require("../.././../models/questionCollection");

exports.EditQuestions = async (body) => {
  let check = await questionCollection.findOne({ _id: body.questionID });
  if (check) {
    check.title = body.title;
    check.options = body.options;
    check.level = body.level;
    check.type = body.type;
    check.answer = body.answer;
    check.explanation = body.explanation;
    check.imageUrl = body.imageUrl;
    check.explanatinImageUrl = body.explanatinImageUrl
    check.explanationLink = body.explanationLink
    check.QuesbankID = body.questionBankId;
    check.updatedAt = new Date()

    await check.save();

    return { status: "success", message: "Question updated successfully ID : " + check._id };
  } else {
    return { status: "error", message: "Something went wrong" };
  }
};

exports.SearchQuestion = async (body) => {
  const check = await questionCollection.findOne({ title: body.title });
  if (check) {
    return check;
  } else {
    return { message: "no found" };
  }
};
