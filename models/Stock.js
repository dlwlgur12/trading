// models/Stock.js

const mongoose = require('mongoose');

// 청약 종목을 정의하는 스키마
const StockSchema = new mongoose.Schema({
  name: { type: String, required: true },  // 청약 종목명
  logo: { type: String, required: true },  // 청약 종목 로고 URL
  amount: { type: Number, required: true }, // 청약금액
  listingDate: { type: Date, required: true } // 상장일
});

// 모델 정의 후 export
module.exports = mongoose.model('Stock', StockSchema);
