import pools from "../../db/database.js";

// 데이터베이스 연결을 테스트하는 비동기 함수 정의
export const testConnection = async (pool) => {
  try {
    // 데이터베이스에 테스트 쿼리를 실행함
    const [rows] = await pools.query(`SELECT 1 + 1 AS solution`);
    //쿼리결과
    console.log(`테스트 쿼리 결과 : ${rows[0].solution}`);
  } catch (err) {
    console.error(`테스트 쿼리 실행 오류 : `, err);
  }
};
