/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Егоров Григорий',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Миллиардер',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://www.formacar.com/storage/images/8/33208/48e2cc3e75f46583007242c612ca86a902.jpg',
    validate: {
      validator: (link) => {
        validator.isURL(link, { protocols: ['http', 'https'], require_protocol: true });
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // не возвращается хеш пароля из бд
  },
  email: {
    type: String,
    required: true,
    unique: true, // чтобы юзер с одним имейлом не мог повторно зарегаться
    validate: {
      validator(email) { // чек формат почты
        return validator.isEmail(email);
      },
    },
  },
});
function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.toJSON = toJSON;

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Пароль или почта указаны неверно.'));
      }
      // сравнить преданный пароль и хешированный
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Пароль или почта указаны неверно.'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
