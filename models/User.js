const mongoose = require('mongoose');

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  birth: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  brokerage: { type: String, required: true },
  account: { type: String, required: true }
});

// User 모델 생성 (명시적으로 users 컬렉션 지정)
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
