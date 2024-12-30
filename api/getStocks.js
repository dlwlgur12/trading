import { MongoClient } from 'mongodb';

const uri = 'YOUR_MONGODB_CONNECTION_STRING'; // MongoDB 연결 URI
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { username } = req.query;

      if (!username) {
        return res.status(400).json({ message: 'Username is required' });
      }

      // MongoDB 연결
      await client.connect();
      const database = client.db('your-database-name'); // 데이터베이스 이름
      const usersCollection = database.collection('users'); // users 컬렉션에서 데이터 조회

      // 회원 정보를 가져오기
      const user = await usersCollection.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // 사용자 주식 목록
      const stocks = user.stocks || []; // 사용자 주식 목록

      return res.status(200).json({ stocks });
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('서버 오류:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
  } finally {
    await client.close();
  }
}
