const mongoose = require('mongoose')

const validator = require('validator')

const Student = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },

  email: {
    type: String,
    required: true,
    unique: [true, 'email is already exists'],
    validate(v) {
      if (!validator.isEmail(v)) {
        throw new Error('email is invaild')
      }
    }
  },

  phoneNumber: {
    type: Number,
    required: true,
    minlength: 10
  },

  course: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  addmissionDate: {
    type: Date,
    default: Date.now
  }

})

const enrollStudent = mongoose.model('Student', Student)

module.exports = enrollStudent
