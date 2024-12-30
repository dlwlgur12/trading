const mongoose = require('mongoose');

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  birth: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  brokerage: { type: String, required: true },
  account: { type: String, required: true },
  stocks: [
    {
      symbol: { type: String },    // 주식 종목
      name: { type: String },      // 주식 이름
      logoUrl: { type: String },   // 주식 로고 URL
      quantity: { type: Number, default: 0 },  // 보유 수량 (기본값 0)
      assetValue: { type: Number, default: 0 }, // 자산 가치 (기본값 0)
    }
  ]
});

// User 모델 생성
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
