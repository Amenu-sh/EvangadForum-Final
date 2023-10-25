const { createAnswer, readAnswers } = require("./answer.controller");

const router = require("express").Router();

router.post("/", createAnswer);
router.get("/:questionId", readAnswers);

module.exports = router;
