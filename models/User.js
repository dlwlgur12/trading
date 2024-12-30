const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },  // 고유한 id 필드
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  birth: { type: String, required: true },
  email: { type: String, required: true, unique: true },  // 고유한 email
  phone: { type: String, required: true },
  brokerage: { type: String, required: true },
  account: { type: String, required: true }
});

// 'id' 필드를 유니크한 값으로 관리
const User = mongoose.model('User', userSchema);

module.exports = User;
