const { addAnswer, getAnswers } = require("./answer.service");

module.exports = {
  createAnswer: (req, res) => {
    const { answer } = req.body;

    if (!answer) {
      // console.log(">>>>>>>>ERROR: at createAnswer");
      res
        .status(400)
        .json({ msg: "ERROR: Please provide an answer in the answer field." });
    }
    addAnswer(req.body, (err, results) => {
      if (err) {
        // console.log(">>>>>>>>ERROR: at createAnswer:addAnswer", req.body);
        // console.log(">>>>>>>>ERROR: at createAnswer:addAnswer");
        return res
          .status(500)
          .json({ msg: "ERROR: adding the answer: database connection err" });
      }
      // console.log(">>>>>>>>success: at createAnswer:addAnswer");

      return res
        .status(200)
        .json({ msg: "New answer is added successfully", data: results });
    });
  },
  readAnswers: (req, res) => {
    // console.log(">>>>>>>>readAnswers question Id: ", req.params.questionId);
    getAnswers(req.params.questionId, (err, results) => {
      if (err) {
        // console.log(">>>>>>>>ERROR: at readAnswers:getAnswers ");
        return res
          .status(500)
          .json({ msg: "ERROR: getting the answers: database connection err" });
      }
      // console.log(">>>>>>>>success: at readAnswers:getAnswers");

      return res
        .status(200)
        .json({ msg: "The answers are imported successfully", data: results });
    });
  },
};
