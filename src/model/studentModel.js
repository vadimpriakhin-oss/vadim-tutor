export const studentModel = {
  level: 1,
  streak: 0,
  mistakes: [],
  weakCategories: {},
  
  initialize() {
    this.level = 1;
    this.streak = 0;
    this.mistakes = [];
    this.weakCategories = {};
  }
};