const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  name: String,               // 청약 종목명
  logo: String,               // 청약 종목 로고 URL
  amount: Number,             // 청약금액
  listingDate: Date,          // 상장일
});

module.exports = mongoose.model('Stock', StockSchema);
