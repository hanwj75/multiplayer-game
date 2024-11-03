//db연결과 관련된 코드

import mysql from "mysql2/promise"; // mtsql2 패키지  가져옴 (비동기 프로미스 지원)
import { config } from "../../config/config.js";
import { formatDate } from "../../utils/dateFomatter.js";

//db 연결 풀을 생성하는 함수
const createPool = () => {
  const pool = mysql.createPool({
    //config.database의 모든 속성을 전개하여 사용

    /*
    현재 createPool은 아래와 같음
const createpool= {
      name: DB1_NAME,
      user: DB1_USER,
      password: DB1_PASSWORD,
      host: DB1_HOST,
      port: DB1_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
    */
    ...config.database,
    waitForConnections: true, //연결 대기 여부 설정
    connectionLimit: 10, // 최대 연결 수를 10으로 설정
    queueLimit: 0, // 대기열의 최대 길이를 무제한으로 설정
  });

  //원래의 pool.query메서드를 저장
  const originQuery = pool.query;

  //쿼리 실행 시 로그를 남기는 새로운 query 메서드 정의
  pool.query = (sql, params) => {
    const date = new Date();

    console.log(
      `[${formatDate(date)}] Executing query : ${sql} ${params ? `,${JSON.stringify(params)}` : ``}`,
    );
    //원래의 qurey 메서드를 호출하여 쿼리를 실행
    return originQuery.call(pool, sql, params);
  };
  return pool; //생성된 연결 풀을 반환한다.
};
//데이터베이스 연결 풀 생성
const pools = createPool();

export default pools;
