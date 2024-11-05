//환경 설정과 관련된 모든것

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../constants/env.js";
//설정 객체 정의
export const config = {
  //db설정
  database: {
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
  },
};
