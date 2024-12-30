const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // 고유한 username
  password: { type: String, required: true },
  name: { type: String, required: true },
  birth: { type: String, required: true },
  email: { type: String, required: true, unique: true },  // 고유한 email
  phone: { type: String, required: true },
  brokerage: { type: String, required: true },
  account: { type: String, required: true }
});

// 'id' 필드를 사용하지 않음, MongoDB는 기본적으로 '_id' 필드를 자동 생성
const User = mongoose.model('User', userSchema);

module.exports = User;
