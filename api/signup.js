const mongoose = require('mongoose');
const User = require('../models/User'); // 모델 불러오기

module.exports = async (req, res) => {
  if (req.method === 'POST') {  // POST 요청 처리
    try {
      const { username, password, name, birth, email, phone, brokerage, account } = req.body;

      // MongoDB 연결
      const dbURI = process.env.MONGO_URI;
      if (!mongoose.connection.readyState) {
        await mongoose.connect(dbURI);
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

      // 사용자 저장
      await newUser.save();

      // 성공적으로 저장 후 응답
      res.status(200).json({ message: '회원가입이 완료되었습니다.', redirect: 'https://trading-pearl.vercel.app/login.html' });
    } catch (error) {
      console.error('회원가입 오류:', error);
      res.status(500).json({ message: '회원가입 실패', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
