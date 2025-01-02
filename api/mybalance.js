const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// MongoDB 연결
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
};

export default async function handler(req, res) {
  // GET 요청만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Authorization 헤더에서 토큰 추출
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>에서 <token>만 추출

  if (!token) {
    return res.status(401).json({ message: '인증이 필요합니다.' });
  }

  try {
    // 토큰을 비밀키로 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 디코딩된 정보에서 사용자 이름 추출
    const username = decoded.username;

    // MongoDB 연결
    await connectDB();

    // 사용자 정보 가져오기
    const user = await User.findOne({ username });

    // 사용자 존재 확인
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 주식 목록 확인
    if (user.stocks && user.stocks.length > 0) {
      res.status(200).json({ stocks: user.stocks });
    } else {
      res.status(404).json({ message: '보유한 주식이 없습니다.' });
    }

  } catch (error) {
    // JWT 토큰 검증 오류 처리
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: '토큰이 만료되었습니다.' });
    }
    // 기타 오류 처리
    console.error('청약 목록 오류:', error);
    res.status(500).json({ message: '청약 목록 불러오기 실패', error: error.message });
  }
}
