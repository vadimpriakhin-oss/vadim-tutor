import { studentModel } from "../model/studentModel";

export function buildPrompt() {
  const weakAreasText = Object.entries(studentModel.weakCategories || {})
    .map(([k, v]) => `${k}: ${v} mistakes`)
    .join(", ") || "no weak areas";

  const recentMistakes = (studentModel.mistakes || [])
    .slice(-5)
    .map((m) => `- ${m.category}: \"${m.userAnswer}\" (correct: \"${m.correctAnswer}\")`)
    .join("\n") || "- no mistakes";

  return `You are a personal AI tutor helping a student learn.

Student Profile:
- Level: ${studentModel.level}
- Current Streak: ${studentModel.streak}
- Weak Areas: ${weakAreasText}

Recent Mistakes:
${recentMistakes}

Your Tasks:
1. Evaluate the student's answer
2. Provide simple explanation of the mistake (if any)
3. Give the correct answer
4. Generate the next exercise based on weak areas

Return a JSON object with this structure:
{
  "correct": true or false,
  "feedback": "Short feedback message",
  "explanation": "Detailed explanation",
  "nextTask": "Next exercise question",
  "hint": "Optional hint for next task"
}`;
}