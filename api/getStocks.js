// api/getStocks.js
export default async function handler(req, res) {
    try {
      if (req.method === 'GET') {
        const { username } = req.query;
  
        // 여기에서 주식 데이터를 반환하는 로직을 작성합니다.
        if (!username) {
          return res.status(400).json({ message: 'Username is required' });
        }
  
        // 주식 목록 데이터를 예시로 반환
        const stocks = [
          { name: '주식 A', logoUrl: 'https://example.com/logoA.png', assetValue: '100,000원', quantity: 10 },
          { name: '주식 B', logoUrl: 'https://example.com/logoB.png', assetValue: '150,000원', quantity: 5 },
        ];
  
        return res.status(200).json({ stocks });
      } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
    } catch (error) {
      console.error('서버 오류:', error);  // 오류 로그 추가
      return res.status(500).json({ message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    }
  }
  