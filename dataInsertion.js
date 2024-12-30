// dataInsertion.js

const mongoose = require('mongoose');
const Stock = require('../models/Stock');  // Stock 모델 불러오기

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const newStock = new Stock({
      name: 'Sample Stock',  // 청약 종목명
      logo: 'https://example.com/logo.png',  // 청약 종목 로고 URL
      amount: 10000,  // 청약금액
      listingDate: new Date('2024-05-01')  // 상장일
    });

    await newStock.save();
    console.log('청약 종목이 MongoDB에 저장되었습니다!');
  })
  .catch(err => {
    console.error('MongoDB 연결 실패:', err);
  });
