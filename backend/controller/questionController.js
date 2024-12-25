const Question = require("../model/question_modal");
async function create(req, res, next) {
  try {
    const {
      question,
      options,
      correctAnswer,
      board,
      class: className,
      subject,
      topic,
      exam,
    } = req.body;

    // Validate that correctAnswer is one of the options
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({
        error: "Correct answer must be one of the provided options",
      });
    }

    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      board,
      class: className,
      subject,
      topic,
      exam,
    });

    const savedQuestion = await newQuestion.save();
    res
      .status(201)
      .json({ message: "Questions created sucessfully", savedQuestion });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

async function getQuestions(req, res, next) {
  try {
    const { board, class: className, subject, topic, exam } = req.query;

    // Build filter object dynamically
    const filter = {};
    if (board) filter.board = board;
    if (className) filter.class = className;
    if (subject) filter.subject = subject;
    if (topic) filter.topic = topic;
    if (exam) filter.exam = exam;

    const questions = await Question.find(filter);

    console.log(questions);

    res.json({ questions });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function getQuestionsById(req, res, next) {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        error: "Question not found",
      });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function updateQuestions(req, res, next) {
  try {
    const {
      question,
      options,
      correctAnswer,
      board,
      class: className,
      subject,
      topic,
      exam,
    } = req.body;

    // Validate that correctAnswer is one of the options
    if (options && !options.includes(correctAnswer)) {
      return res.status(400).json({
        error: "Correct answer must be one of the provided options",
      });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        question,
        options,
        correctAnswer,
        board,
        class: className,
        subject,
        topic,
        exam,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Run model validations on update
      }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        error: "Question not found",
      });
    }

    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

async function deleteQuestion(req, res, next) {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
      return res.status(404).json({
        error: "Question not found",
      });
    }

    res.json({
      message: "Question deleted successfully",
      deletedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  create,
  getQuestions,
  getQuestionsById,
  deleteQuestion,
  updateQuestions,
};
