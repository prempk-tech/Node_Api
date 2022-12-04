const mongoose = require('mongoose');

const student = new mongoose.Schema({
  student_id: {
    type: String,
    required: false,
  },
  student_name: {
    type: String,
    required: false,
  },
  student_age: {
    type: String,
    required: false
  },
  student_mark1: {
    type: Number,
    required: false
  },
  student_mark2: {
    type: Number,
    required: false
  },
  student_mark3: {
    type: Number,
    required: false
  },
});

module.exports = mongoose.model('student', student)