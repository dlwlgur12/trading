// models/User.js
const mongoose = require('mongoose');

// User 스키마 정의
const userSchema = new mongoose.Schema({
  id: String,         // 사용자 ID
  name: String,       // 이름
  email: String,      // 이메일
  phone: String,      // 전화번호
  brokerage: String,  // 증권사
  accountNumber: String, // 계좌번호
  password: String,   // 비밀번호
  balance: Number,    // 잔액
  stocks: [           // 청약 종목 배열
    {
      symbol: String,    // 종목 코드
      name: String,      // 종목 이름
      logoUrl: String,   // 로고 URL
      quantity: Number,  // 보유 수량
      assetValue: Number // 자산 가치
    }
  ]
});

// User 모델 생성
const User = mongoose.model('User', userSchema);

module.exports = User;
