const { addQuestion, importQuestions } = require("./question.service");

//Importing database structure
const pool = require("../../config/Database");

module.exports = {
  createQuestion: (req, res) => {
    const { question, question_description } = req.body;
    // console.log("********** provided: ");
    // console.log("********** question title ", title);
    // console.log("********** question description ", description);

    if (!question)
      return res
        .status(400)
        .json({ msg: "Please provide a title for your question." });

    addQuestion(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ msg: "Error adding the question: database connection err" });
      }
      return res.status(200).json({
        msg: "New question is created successfully",
        data: results,
      });
    });
  },
  getQuestions: (req, res) => {
    importQuestions((err, results) => {
      if (err) {
        console.log("get Questions: ", err);
        return res.status(500).json({ msg: "Database connection error." });
      }
      // console.log(">>>>>>> getQestions: response passed");
      //   console.log(res);
      //   console.log(results);
      //   return res;
      return res.status(200).json({ data: results });
    });
  },
};
