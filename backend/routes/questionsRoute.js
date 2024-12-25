const express = require("express");
const router = express.Router();

const questionController = require("../controller/questionController");

router.get("/questions", questionController.getQuestions);
router.post("/questions", questionController.create);
router.get("/questions/:id", questionController.getQuestionsById);
router.put("/questions/:id", questionController.updateQuestions);
router.delete("/questions/:id", questionController.deleteQuestion);

module.exports = router;
