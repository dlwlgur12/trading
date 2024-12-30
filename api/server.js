const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // 환경 변수 로드
const User = require('../models/User');  // User 모델 불러오기
const Stock = require('../models/Stock');  // Stock 모델 불러오기
const path = require('path');  // path 모듈 추가

const app = express();
const port = 3000;

// CORS 미들웨어 설정
app.use(cors());  // 모든 도메인에서의 접근을 허용

// MongoDB 연결 URI
const dbURI = process.env.MONGO_URI;  // .env 파일에서 MONGO_URI를 로드

// MongoDB 연결
mongoose.connect(dbURI)
  .then(() => {
    console.log('MongoDB 연결 성공');
  })
  .catch((err) => {
    console.error('MongoDB 연결 실패:', err);
  });

// 미들웨어 설정
app.use(bodyParser.json());  // JSON 형식의 요청 본문 처리
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식 처리

// 회원가입 처리 라우트
app.post('api/signup', async (req, res) => {
  try {
    const { username, password, name, birth, email, phone, brokerage, account } = req.body;

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
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '회원가입 실패', error });
  }
});

// 로그인 페이지 라우트
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// 청약 목록 GET 요청 처리 (Stock 데이터 반환)
app.get('/api/mybalance', async (req, res) => {
  try {
    // 사용자 인증 (JWT 확인)
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: '인증이 필요합니다.' });
    }

    // MongoDB에서 청약 목록을 가져옵니다.
    const stocks = await Stock.find(); 

    // 청약 목록을 클라이언트에 반환
    res.status(200).json({ stocks });
  } catch (error) {
    console.error('청약 목록 불러오기 오류:', error);
    res.status(500).json({ message: '청약 목록을 불러오는 데 실패했습니다.', error });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
