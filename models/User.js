const mongoose = require('mongoose');

// User 스키마에서 'id' 필드를 고유하게 사용
const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },  // 유니크한 id 필드
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  birth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  brokerage: { type: String, required: true },
  account: { type: String, required: true }
});

// 회원가입 시 id 값을 자동으로 설정 (예: username을 id로 사용)
userSchema.pre('save', function(next) {
  if (this.username) {
    this.id = this.username;  // id에 username을 넣음
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
