// api/mybalance.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Stock = require('../models/Stock');  // Stock 모델 가져오기
const User = require('../models/User');    // User 모델 가져오기

// MongoDB 연결
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];  // Authorization 헤더에서 토큰을 추출
  if (!token) return res.status(401).json({ message: '인증이 필요합니다.' });

  try {
    // JWT 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    // MongoDB 연결
    await connectDB();

    // 해당 사용자에 맞는 주식 목록 조회
    const stocks = await Stock.find({ username });

    if (stocks.length > 0) {
      res.status(200).json({ stocks });
    } else {
      res.status(404).json({ message: '보유한 주식이 없습니다.' });
    }
  } catch (error) {
    console.error('청약 목록 오류:', error);
    res.status(500).json({ message: '청약 목록 불러오기 실패', error });
  }
}
