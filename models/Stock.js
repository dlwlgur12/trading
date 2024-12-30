const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  username: { type: String, required: true },  // 사용자 이름
  stockName: { type: String, required: true },  // 주식 이름
  assetValue: { type: Number, required: true }, // 청약 금액
  quantity: { type: Number, required: true },   // 보유 수량
  logoUrl: { type: String },  // 로고 URL (선택 사항)
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
