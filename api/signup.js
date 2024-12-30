const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('../models/User');
require('dotenv').config();

const app = express();

// CORS 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch(err => console.error('MongoDB 연결 실패:', err));

// 회원가입 처리 라우트
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password, name, birth, email, phone, brokerage, account } = req.body;

    // 중복된 사용자 체크 (username 또는 email 중복 검사)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: '이미 사용 중인 아이디 또는 이메일입니다.' });
    }

    // 새로운 사용자 생성
    const newUser = new User({
      username,
      password,
      name,
      birth,
      email,
      phone,
      brokerage,
      account
    });

    // 사용자 저장 (users 컬렉션에 저장)
    await newUser.save();
    res.status(200).json({ message: '회원가입이 완료되었습니다.', redirect: 'https://trading-pearl.vercel.app/login.html' });
  } catch (error) {
    console.error('회원가입 오류 발생:', error);  // 오류 세부 사항 출력
    res.status(500).json({ message: '회원가입 실패', error: error.message });  // 에러 메시지 출력
  }
});

module.exports = app;
