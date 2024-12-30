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
app.post('api/signup', async (req, res) => {
  try {
    const { username, password, name, birth, email, phone, brokerage, account } = req.body;

    const newUser = new User({
      username,
      password,
      name,
      birth,
      email,
      phone,
      brokerage,
      account,
    });

    await newUser.save();
    res.status(200).json({ message: '회원가입이 완료되었습니다.', redirect: 'https://trading-pearl.vercel.app/login.html' });
  } catch (error) {
    res.status(500).json({ message: '회원가입 실패', error });
  }
});

module.exports = app;
