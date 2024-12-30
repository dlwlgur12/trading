const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  birth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  brokerage: { type: String, required: true },
  account: { type: String, required: true },
});

// 'id' 필드를 추가하는 대신 'username'이나 'email' 필드를 고유하게 설정
// or 기본적으로 제공되는 '_id'를 그대로 사용할 수 있습니다.

const User = mongoose.model('User', userSchema);
module.exports = User;
