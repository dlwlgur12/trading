const mongoose = require('mongoose');

// User 스키마에서 'id' 필드를 제거하고, '_id' 필드를 기본으로 사용
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  birth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  brokerage: { type: String, required: true },
  account: { type: String, required: true }
}, {
  // '_id'를 기본값으로 사용하고, 'id'를 사용하지 않음
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
