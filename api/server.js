const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken'); // JWT 사용
const User = require('../models/User');
const Stock = require('../models/Stock');
const path = require('path');

const app = express();
const port = 3000;

// CORS 설정
app.use(cors());

// MongoDB 연결
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 회원가입 처리
app.post('/api/signup', async (req, res) => {
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
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '회원가입 실패', error });
  }
});

// 로그인 처리
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: '로그인 실패: 사용자 정보를 확인하세요.' });

    const payload = {
      id: user._id,
      username: user.username,
      name: encodeURIComponent(user.name),
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: '로그인 성공', token });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '로그인 처리 실패', error });
  }
});

// 청약 목록 반환
app.get('/api/mybalance', async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: '인증이 필요합니다.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const stocks = await Stock.find(); 
    res.status(200).json({ stocks });
  } catch (error) {
    console.error('청약 목록 오류:', error);
    res.status(500).json({ message: '청약 목록을 불러오는 데 실패했습니다.', error });
  }
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '../public')));

// 서버 실행
app.listen(port, () => console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`));
