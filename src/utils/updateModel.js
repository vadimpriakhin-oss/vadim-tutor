import { studentModel } from "../model/studentModel";

export function updateModel(category, isCorrect, userAnswer, correctAnswer) {
  // Validation
  if (typeof category !== "string" || !category.trim()) {
    throw new Error("Category must be a non-empty string");
  }
  if (typeof isCorrect !== "boolean") {
    throw new Error("isCorrect must be a boolean");
  }
  if (typeof userAnswer !== "string" || typeof correctAnswer !== "string") {
    throw new Error("userAnswer and correctAnswer must be strings");
  }

  // Initialize if needed
  if (!studentModel.mistakes) studentModel.mistakes = [];
  if (!studentModel.weakCategories) studentModel.weakCategories = {};

  if (!isCorrect) {
    studentModel.weakCategories[category] =
      (studentModel.weakCategories[category] || 0) + 1;

    studentModel.mistakes.push({
      category,
      userAnswer,
      correctAnswer,
      timestamp: new Date().toISOString()
    });

    studentModel.streak = 0;
  } else {
    studentModel.streak++;
  }

  const totalMistakes = Object.values(studentModel.weakCategories).reduce(
    (a, b) => a + b,
    0
  );
  studentModel.level = Math.max(1, Math.floor(totalMistakes / 5) + 1);
}