const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');    // User 모델 가져오기

// MongoDB 연결
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
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

    // 해당 사용자 정보를 조회 (stocks 필드 포함)
    const user = await User.findOne({ username });

    if (user && user.stocks && user.stocks.length > 0) {
      res.status(200).json({ stocks: user.stocks });
    } else {
      res.status(404).json({ message: '보유한 주식이 없습니다.' });
    }
  } catch (error) {
    // 오류를 더 구체적으로 처리하여 로그와 응답에 포함
    console.error('청약 목록 오류:', error);
    res.status(500).json({ message: '청약 목록 불러오기 실패', error: error.message });
  }
}