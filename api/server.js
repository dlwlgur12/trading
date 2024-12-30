const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Stock = require('./models/Stock');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

// 회원가입
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
    res.status(200).json({ message: '회원가입이 완료되었습니다.', redirect: '/login.html' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '회원가입 실패', error });
  }
});

// 로그인
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    const payload = {
      id: user._id,
      username: user.username,
      name: encodeURIComponent(user.name),
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '로그인 실패', error });
  }
});

// 사용자별 주식 목록 반환
app.get('/api/mybalance', async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: '인증이 필요합니다.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    // 해당 사용자에 맞는 주식 목록 조회
    const user = await User.findOne({ username });

    // 주식 목록 확인
    console.log('주식 목록:', user ? user.stocks : '사용자 없음');

    if (user && user.stocks && user.stocks.length > 0) {
      res.status(200).json({ stocks: user.stocks });
    } else {
      res.status(404).json({ message: '보유한 주식이 없습니다.' });
    }
  } catch (error) {
    console.error('청약 목록 오류:', error);
    res.status(500).json({ message: '청약 목록 불러오기 실패', error });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
