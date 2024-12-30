const mongoose = require('mongoose');
const Stock = require('../models/Stock');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // 사용자 인증 (JWT 확인)
      const token = req.headers['authorization'].split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: '인증이 필요합니다.' });
      }

      const stocks = await Stock.find(); // MongoDB에서 청약 목록을 가져옵니다.
      res.status(200).json({ stocks });  // JSON 형태로 클라이언트에 반환
    } catch (error) {
      console.error('청약 목록 불러오기 오류:', error);
      res.status(500).json({ message: '청약 목록을 불러오는 데 실패했습니다.', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
