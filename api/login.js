const mongoose = require('mongoose');
const User = require('../../models/User');
const jwt = require('jsonwebtoken'); // JWT 사용
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      // MongoDB 연결
      const dbURI = process.env.MONGO_URI;
      if (!mongoose.connection.readyState) {
        await mongoose.connect(dbURI);
      }

      // 사용자 확인
      const user = await User.findOne({ username, password });
      if (!user) {
        return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
      }

      // JWT 생성 (로그인 상태 유지)
      const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // 성공적으로 로그인된 경우
      res.status(200).json({ 
        message: `${user.name}님, 로그인되었습니다.`,
        token, 
        redirect: 'https://trading-pearl.vercel.app/' 
      });
    } catch (error) {
      console.error('로그인 오류:', error);
      res.status(500).json({ message: '로그인 실패', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
